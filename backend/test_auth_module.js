const http = require("http");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const app = require("express")();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

const authRoutes = require("./routes/auth/authRoutes");
const roleRoutes = require("./routes/auth/roleRoutes");
const userRoutes = require("./routes/auth/userRoutes");
const staffRoutes = require("./routes/staff/staffRoutes");
const guestProfileRoutes = require("./routes/staff/guestProfileRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/guest-profiles", guestProfileRoutes);

const Role = require("./models/identity/Role");
const User = require("./models/identity/User");
const StaffProfile = require("./models/identity/StaffProfile");
const GuestProfile = require("./models/identity/GuestProfile");

let server;
let port;
let baseUrl;

// Helper to make HTTP requests
function request(method, path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const headers = options.headers || {};
    let body = null;

    if (options.body) {
      body = JSON.stringify(options.body);
      headers["Content-Type"] = "application/json";
      headers["Content-Length"] = Buffer.byteLength(body);
    }

    if (options.cookie) {
      headers["Cookie"] = options.cookie;
    }

    const req = http.request(
      url,
      {
        method,
        headers,
      },
      (res) => {
        let rawData = "";
        res.on("data", (chunk) => (rawData += chunk));
        res.on("end", () => {
          let data = rawData;
          try {
            data = JSON.parse(rawData);
          } catch (e) {}

          const setCookieHeader = res.headers["set-cookie"];
          let cookie = null;
          if (setCookieHeader) {
            const firstCookie = Array.isArray(setCookieHeader)
              ? setCookieHeader[0]
              : setCookieHeader;
            cookie = firstCookie.split(";")[0];
          }

          resolve({
            status: res.statusCode,
            headers: res.headers,
            data,
            cookie,
          });
        });
      }
    );

    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    throw new Error(message);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

async function runTests() {
  console.log("=== Starting Authentication & Authorization Module Test Suite ===");
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/HMS");

  server = http.createServer(app);
  await new Promise((resolve) => {
    server.listen(0, () => {
      port = server.address().port;
      baseUrl = `http://localhost:${port}`;
      console.log(`Test server running on ${baseUrl}`);
      resolve();
    });
  });

  try {
    // 1. Ensure Roles exist
    const roleNames = ["admin", "manager", "receptionist", "housekeeping", "maintenance", "guest"];
    const rolesMap = {};
    for (const name of roleNames) {
      let r = await Role.findOne({ name });
      if (!r) {
        r = await Role.create({ name, description: `${name} role`, isActive: true });
      }
      rolesMap[name] = r;
    }

    // 2. Create / ensure an Admin test user
    const adminEmail = "test.admin@luxurystay.com";
    await StaffProfile.deleteMany({ employeeId: { $regex: /^TEST-/ } });
    await User.deleteMany({ email: { $regex: /@test\.(com|luxurystay\.com)/ } });

    const adminPasswordHash = await bcrypt.hash("AdminSecret123!", 10);
    const adminUser = await User.create({
      firstName: "Super",
      lastName: "Admin",
      email: adminEmail,
      password: adminPasswordHash,
      role: rolesMap.admin._id,
      status: "active",
    });
    await StaffProfile.create({
      user: adminUser._id,
      employeeId: "TEST-ADM-001",
      department: "administration",
      position: "Admin Director",
    });

    console.log("\n--- TEST GROUP 1: Guest Registration & Role Enforcement ---");
    // Register as guest with attempt to inject role: 'admin'
    const regRes = await request("POST", "/api/auth/register", {
      body: {
        firstName: "Test",
        lastName: "Guest",
        email: "guest.test@test.com",
        password: "GuestPassword123!",
        role: "admin", // Attacker attempt to escalate
        phone: "+92-300-9999999",
        nationality: "Pakistani",
      },
    });

    assert(regRes.status === 201, "Guest registration returns 201 Created");
    assert(regRes.data.user.role.name === "guest", "Role is strictly forced to 'guest' regardless of input");
    assert(!regRes.data.user.password, "Password hash is never returned in registration response");
    assert(regRes.cookie && regRes.cookie.includes("token="), "HttpOnly cookie 'token' is set on registration");
    assert(regRes.data.profile !== null, "GuestProfile is automatically created");

    const guestCookie = regRes.cookie;

    console.log("\n--- TEST GROUP 2: Authentication & Route Protection ---");
    // Request protected route without token
    const unauthRes = await request("GET", "/api/auth/me");
    assert(unauthRes.status === 401, "Unauthenticated request to /api/auth/me returns 401");

    // Request protected route with valid token
    const meRes = await request("GET", "/api/auth/me", { cookie: guestCookie });
    assert(meRes.status === 200, "Authenticated request to /api/auth/me returns 200");
    assert(meRes.data.user.email === "guest.test@test.com", "Returns correct authenticated user");
    assert(!meRes.data.user.password, "Authenticated user response excludes password");

    console.log("\n--- TEST GROUP 3: Login & Logout Flow ---");
    // Invalid password
    const failLoginRes = await request("POST", "/api/auth/login", {
      body: { email: "guest.test@test.com", password: "WrongPassword" },
    });
    assert(failLoginRes.status === 401, "Login with wrong password returns 401");

    // Successful login
    const loginRes = await request("POST", "/api/auth/login", {
      body: { email: "guest.test@test.com", password: "GuestPassword123!" },
    });
    assert(loginRes.status === 200, "Login with valid password returns 200");
    assert(loginRes.cookie && loginRes.cookie.includes("token="), "Login sets HttpOnly cookie");
    assert(!loginRes.data.user.password, "Password is not returned in login response");

    // Logout
    const logoutRes = await request("POST", "/api/auth/logout");
    assert(logoutRes.status === 200, "Logout returns 200");
    assert(
      logoutRes.headers["set-cookie"] &&
        logoutRes.headers["set-cookie"].some((c) => c.includes("token=;")),
      "Logout clears the auth cookie"
    );

    console.log("\n--- TEST GROUP 4: RBAC Enforcement ---");
    // Guest attempts to view staff list -> 403
    const guestStaffRes = await request("GET", "/api/staff", { cookie: guestCookie });
    assert(guestStaffRes.status === 403, "Guest forbidden (403) from accessing /api/staff");

    // Guest attempts to create a staff profile -> 403
    const guestCreateStaffRes = await request("POST", "/api/staff", {
      cookie: guestCookie,
      body: {
        firstName: "Hacker",
        lastName: "Staff",
        email: "hacker@test.com",
        password: "Pass",
      },
    });
    assert(guestCreateStaffRes.status === 403, "Guest forbidden (403) from creating staff");

    // Guest attempts to view users list -> 403
    const guestUsersRes = await request("GET", "/api/users", { cookie: guestCookie });
    assert(guestUsersRes.status === 403, "Guest forbidden (403) from accessing /api/users");

    console.log("\n--- TEST GROUP 5: Admin Login & Staff Creation ---");
    // Admin login
    const adminLoginRes = await request("POST", "/api/auth/login", {
      body: { email: adminEmail, password: "AdminSecret123!" },
    });
    assert(adminLoginRes.status === 200, "Admin login returns 200");
    const adminCookie = adminLoginRes.cookie;

    // Admin creates Manager account
    const createMgrRes = await request("POST", "/api/staff", {
      cookie: adminCookie,
      body: {
        firstName: "Tahir",
        lastName: "Manager",
        email: "tahir.manager@test.com",
        password: "ManagerPassword123!",
        role: "manager",
        employeeId: "TEST-MGT-001",
        position: "Operations Manager",
        department: "management",
      },
    });
    assert(createMgrRes.status === 201, "Admin successfully creates Manager account");
    assert(createMgrRes.data.staff.user.role.name === "manager", "Manager role correctly assigned");
    assert(createMgrRes.data.staff.department === "management", "Department set correctly");
    assert(!createMgrRes.data.staff.user.password, "Manager password hash not exposed");
    const managerStaffId = createMgrRes.data.staff._id;

    // Verify RULE: "only the admin can create staff profiles. not any one else"
    // Manager logs in and attempts to create a staff profile -> must return 403!
    const mgrLoginRes = await request("POST", "/api/auth/login", {
      body: { email: "tahir.manager@test.com", password: "ManagerPassword123!" },
    });
    const mgrCookie = mgrLoginRes.cookie;

    const mgrCreateStaffRes = await request("POST", "/api/staff", {
      cookie: mgrCookie,
      body: {
        firstName: "Staff",
        lastName: "ByManager",
        email: "staff.bymanager@test.com",
        password: "Password123!",
        role: "housekeeping",
      },
    });
    assert(
      mgrCreateStaffRes.status === 403,
      "STRICT RULE VERIFIED: Manager CANNOT create staff profiles (403 Forbidden)"
    );

    // Admin creates Receptionist account
    const createRecRes = await request("POST", "/api/staff", {
      cookie: adminCookie,
      body: {
        firstName: "Amina",
        lastName: "Reception",
        email: "amina.rec@test.com",
        password: "RecPassword123!",
        role: "receptionist",
        employeeId: "TEST-REC-001",
      },
    });
    assert(createRecRes.status === 201, "Admin creates Receptionist account");

    // Admin creates Housekeeping account
    const createHkRes = await request("POST", "/api/staff", {
      cookie: adminCookie,
      body: {
        firstName: "Kashif",
        lastName: "Cleaner",
        email: "kashif.hk@test.com",
        password: "HkPassword123!",
        role: "housekeeping",
        employeeId: "TEST-HKP-001",
      },
    });
    assert(createHkRes.status === 201, "Admin creates Housekeeping account");

    // Admin creates Maintenance account
    const createMaintRes = await request("POST", "/api/staff", {
      cookie: adminCookie,
      body: {
        firstName: "Naveed",
        lastName: "Technician",
        email: "naveed.maint@test.com",
        password: "MaintPassword123!",
        role: "maintenance",
        employeeId: "TEST-MNT-001",
      },
    });
    assert(createMaintRes.status === 201, "Admin creates Maintenance account");

    console.log("\n--- TEST GROUP 6: Staff Management Operations ---");
    // Admin views all staff
    const staffListRes = await request("GET", "/api/staff", { cookie: adminCookie });
    assert(staffListRes.status === 200, "Admin can view staff list");
    assert(staffListRes.data.count >= 5, "Staff list includes all created staff");
    // Verify no password hash in any staff record
    const hasAnyPassword = staffListRes.data.staff.some((s) => s.user && s.user.password);
    assert(!hasAnyPassword, "Staff listing contains no password hashes");

    // Admin views specific staff member
    const singleStaffRes = await request("GET", `/api/staff/${managerStaffId}`, {
      cookie: adminCookie,
    });
    assert(singleStaffRes.status === 200, "Admin can view specific staff member");
    assert(singleStaffRes.data.staff.employeeId === "TEST-MGT-001", "Correct staff returned");

    // Admin updates staff info and deactivates account
    const updateStaffRes = await request("PUT", `/api/staff/${managerStaffId}`, {
      cookie: adminCookie,
      body: {
        position: "Senior General Manager",
        status: "inactive",
      },
    });
    assert(updateStaffRes.status === 200, "Admin successfully updates staff member");
    assert(updateStaffRes.data.staff.position === "Senior General Manager", "Position updated");
    assert(updateStaffRes.data.staff.user.status === "inactive", "Staff status set to inactive");

    // Deactivated staff attempts to login -> 403
    const deactLoginRes = await request("POST", "/api/auth/login", {
      body: { email: "tahir.manager@test.com", password: "ManagerPassword123!" },
    });
    assert(
      deactLoginRes.status === 403,
      "Deactivated staff member login is rejected with 403"
    );

    // Admin reactivates staff account and changes role
    const reactivateRes = await request("PUT", `/api/staff/${managerStaffId}`, {
      cookie: adminCookie,
      body: {
        status: "active",
        role: "receptionist",
      },
    });
    assert(reactivateRes.status === 200, "Admin reactivates staff member");
    assert(reactivateRes.data.staff.user.status === "active", "Staff reactivated");
    assert(
      reactivateRes.data.staff.user.role.name === "receptionist",
      "Staff role changed to receptionist"
    );

    console.log("\n--- TEST GROUP 7: User Management Operations ---");
    // Admin gets users
    const usersRes = await request("GET", "/api/users", { cookie: adminCookie });
    assert(usersRes.status === 200, "Admin can retrieve users list");

    // Admin creates a user directly
    const createDirectUserRes = await request("POST", "/api/users", {
      cookie: adminCookie,
      body: {
        firstName: "Direct",
        lastName: "User",
        email: "direct.user@test.com",
        password: "DirectPassword123!",
        role: rolesMap.guest._id,
      },
    });
    assert(createDirectUserRes.status === 201, "Admin creates user directly");
    const directUserId = createDirectUserRes.data.user._id;

    // Admin updates user status to suspended
    const patchStatusRes = await request("PATCH", `/api/users/${directUserId}/status`, {
      cookie: adminCookie,
      body: { status: "suspended" },
    });
    assert(patchStatusRes.status === 200, "Admin updates user status to suspended");
    assert(patchStatusRes.data.user.status === "suspended", "User status is suspended");

    // Clean up test records
    console.log("\n--- Cleaning up test records ---");
    await StaffProfile.deleteMany({ employeeId: { $regex: /^TEST-/ } });
    await User.deleteMany({ email: { $regex: /@(test\.com|luxurystay\.com)/ } });
    await GuestProfile.deleteMany({ user: { $in: [regRes.data.user._id, directUserId] } });

    console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY! 🎉");
  } finally {
    if (server) server.close();
    await mongoose.disconnect();
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
