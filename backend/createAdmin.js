const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const Role = require("./models/identity/Role");
const User = require("./models/identity/User");
const StaffProfile = require("./models/identity/StaffProfile");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/HMS");
    console.log("Connected to MongoDB.");

    let adminRole = await Role.findOne({ name: "admin" });
    if (!adminRole) {
      adminRole = await Role.create({
        name: "admin",
        description: "Full system access",
        permissions: ["manage_users", "manage_hotels", "all"],
        isActive: true,
      });
      console.log("Admin role created.");
    }

    const email = "admin@luxurystay.com";
    const plainPassword = "AdminPassword123!";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    // Also update seeded admin Ayesha Khan with a known password if exists
    const seededAdmin = await User.findOne({ email: "ayesha.khan@luxurystay.com" });
    if (seededAdmin) {
      seededAdmin.password = hashedPassword;
      seededAdmin.status = "active";
      await seededAdmin.save();
      console.log("Seeded Admin (ayesha.khan@luxurystay.com) updated with password: AdminPassword123!");
    }

    let adminUser = await User.findOne({ email });
    if (adminUser) {
      adminUser.password = hashedPassword;
      adminUser.role = adminRole._id;
      adminUser.status = "active";
      await adminUser.save();
      console.log(`Admin user (${email}) updated with active status and password.`);
    } else {
      adminUser = await User.create({
        firstName: "System",
        lastName: "Administrator",
        email,
        password: hashedPassword,
        phone: "+92-300-0000001",
        role: adminRole._id,
        status: "active",
      });
      console.log(`Admin user (${email}) created.`);
    }

    let staffProfile = await StaffProfile.findOne({ user: adminUser._id });
    if (!staffProfile) {
      // Find unused employeeId
      let empId = "LS-ADM-000";
      const existing = await StaffProfile.findOne({ employeeId: empId });
      if (existing) {
        empId = `LS-ADM-${Date.now().toString().slice(-4)}`;
      }

      staffProfile = await StaffProfile.create({
        user: adminUser._id,
        employeeId: empId,
        department: "administration",
        position: "Chief Administrator",
        joiningDate: new Date(),
      });
      console.log(`StaffProfile created with employeeId: ${empId}`);
    }

    console.log("\n========================================");
    console.log("✅ Admin accounts are ready for Postman!");
    console.log("----------------------------------------");
    console.log("Account 1 (Main Admin):");
    console.log(`  Email:    ${email}`);
    console.log(`  Password: ${plainPassword}`);
    console.log("----------------------------------------");
    console.log("Account 2 (Seeded Admin):");
    console.log(`  Email:    ayesha.khan@luxurystay.com`);
    console.log(`  Password: ${plainPassword}`);
    console.log("========================================\n");

    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
