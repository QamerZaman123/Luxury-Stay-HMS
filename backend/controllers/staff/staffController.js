const bcrypt = require("bcryptjs");
const User = require("../../models/identity/User");
const Role = require("../../models/identity/Role");
const StaffProfile = require("../../models/identity/StaffProfile");

const ALLOWED_STAFF_ROLES = [
  "admin",
  "manager",
  "receptionist",
  "housekeeping",
  "maintenance",
];

const ROLE_DEPARTMENT_MAP = {
  admin: "administration",
  manager: "management",
  receptionist: "reception",
  housekeeping: "housekeeping",
  maintenance: "maintenance",
};

// @desc    Create a new staff member account and profile (ADMIN ONLY)
// @route   POST /api/staff
// @access  Protected (Admin only)
const createStaffProfile = async (req, res) => {
  let createdUser = null;

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      role: roleInput,
      employeeId,
      department: departmentInput,
      position,
      joiningDate,
      emergencyContact,
      status,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "firstName, lastName, email, and password are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Determine and validate the role
    let roleDoc = null;
    if (roleInput) {
      if (typeof roleInput === "string" && roleInput.match(/^[0-9a-fA-F]{24}$/)) {
        roleDoc = await Role.findById(roleInput);
      } else {
        roleDoc = await Role.findOne({ name: String(roleInput).toLowerCase().trim() });
      }
    } else {
      // Default to receptionist if no role specified
      roleDoc = await Role.findOne({ name: "receptionist" });
    }

    if (!roleDoc || !ALLOWED_STAFF_ROLES.includes(roleDoc.name)) {
      return res.status(400).json({
        success: false,
        message: `Invalid staff role. Permitted staff roles are: ${ALLOWED_STAFF_ROLES.join(", ")}`,
      });
    }

    // Determine department
    const department =
      departmentInput ||
      ROLE_DEPARTMENT_MAP[roleDoc.name] ||
      "administration";

    // Determine or generate unique employeeId
    let finalEmployeeId = employeeId ? employeeId.trim() : null;
    if (!finalEmployeeId) {
      const prefix = roleDoc.name.slice(0, 3).toUpperCase();
      finalEmployeeId = `LS-${prefix}-${Date.now().toString().slice(-5)}`;
    }

    const existingStaff = await StaffProfile.findOne({ employeeId: finalEmployeeId });
    if (existingStaff) {
      return res.status(400).json({
        success: false,
        message: `A staff profile with employeeId '${finalEmployeeId}' already exists.`,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    createdUser = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone ? phone.trim() : undefined,
      role: roleDoc._id,
      status: status || "active",
    });

    // Create Staff Profile
    const staffProfile = await StaffProfile.create({
      user: createdUser._id,
      employeeId: finalEmployeeId,
      department,
      position: position || `${roleDoc.name.charAt(0).toUpperCase() + roleDoc.name.slice(1)}`,
      joiningDate: joiningDate || new Date(),
      emergencyContact: emergencyContact || undefined,
    });

    const populatedProfile = await StaffProfile.findById(staffProfile._id).populate({
      path: "user",
      select: "-password",
      populate: { path: "role" },
    });

    return res.status(201).json({
      success: true,
      message: `Staff account (${roleDoc.name}) created successfully.`,
      staff: populatedProfile,
    });
  } catch (error) {
    // Rollback user creation if profile creation failed
    if (createdUser && createdUser._id) {
      await User.findByIdAndDelete(createdUser._id).catch(() => {});
    }

    return res.status(500).json({
      success: false,
      message: `Failed to create staff account: ${error.message}`,
    });
  }
};

// @desc    Get all staff profiles with populated user & role
// @route   GET /api/staff
// @access  Protected (Admin, Manager)
const getStaffProfiles = async (req, res) => {
  try {
    const { department, status, search } = req.query;
    const query = {};

    if (department) {
      query.department = department;
    }

    let staffProfiles = await StaffProfile.find(query)
      .populate({
        path: "user",
        select: "-password",
        populate: { path: "role" },
      })
      .sort({ createdAt: -1 });

    // Optional user status filter
    if (status) {
      staffProfiles = staffProfiles.filter(
        (sp) => sp.user && sp.user.status === status
      );
    }

    // Optional search filter
    if (search) {
      const term = search.toLowerCase();
      staffProfiles = staffProfiles.filter((sp) => {
        if (!sp.user) return false;
        const fullName = `${sp.user.firstName} ${sp.user.lastName}`.toLowerCase();
        const email = sp.user.email.toLowerCase();
        const empId = sp.employeeId.toLowerCase();
        return (
          fullName.includes(term) ||
          email.includes(term) ||
          empId.includes(term)
        );
      });
    }

    return res.status(200).json({
      success: true,
      count: staffProfiles.length,
      staff: staffProfiles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch staff profiles: ${error.message}`,
    });
  }
};

// @desc    Get single staff profile by ID or User ID
// @route   GET /api/staff/:id
// @access  Protected (Admin, Manager)
const getStaffProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    let profile = await StaffProfile.findById(id).populate({
      path: "user",
      select: "-password",
      populate: { path: "role" },
    });

    // If not found by StaffProfile ID, attempt search by User ID
    if (!profile) {
      profile = await StaffProfile.findOne({ user: id }).populate({
        path: "user",
        select: "-password",
        populate: { path: "role" },
      });
    }

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found.",
      });
    }

    return res.status(200).json({
      success: true,
      staff: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch staff details: ${error.message}`,
    });
  }
};

// @desc    Update staff profile & linked user account (ADMIN ONLY)
// @route   PUT /api/staff/:id
// @access  Protected (Admin only)
const updateStaffProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      department,
      position,
      joiningDate,
      emergencyContact,
      employeeId,
      // User fields
      firstName,
      lastName,
      phone,
      status,
      role: roleInput,
      password,
    } = req.body;

    let profile = await StaffProfile.findById(id).populate("user");
    if (!profile) {
      profile = await StaffProfile.findOne({ user: id }).populate("user");
    }

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found.",
      });
    }

    // Update StaffProfile fields
    if (department) profile.department = department;
    if (position) profile.position = position;
    if (joiningDate) profile.joiningDate = joiningDate;
    if (emergencyContact) profile.emergencyContact = emergencyContact;
    if (employeeId && employeeId !== profile.employeeId) {
      const existing = await StaffProfile.findOne({ employeeId });
      if (existing && existing._id.toString() !== profile._id.toString()) {
        return res.status(400).json({
          success: false,
          message: `EmployeeId '${employeeId}' is already in use.`,
        });
      }
      profile.employeeId = employeeId;
    }

    await profile.save();

    // Update linked user if fields are provided
    if (profile.user) {
      const user = await User.findById(profile.user._id);
      if (user) {
        if (firstName) user.firstName = firstName.trim();
        if (lastName) user.lastName = lastName.trim();
        if (phone !== undefined) user.phone = phone ? phone.trim() : null;
        if (status && ["active", "inactive", "suspended"].includes(status)) {
          user.status = status;
        }

        // Change staff role
        if (roleInput) {
          let newRole = null;
          if (typeof roleInput === "string" && roleInput.match(/^[0-9a-fA-F]{24}$/)) {
            newRole = await Role.findById(roleInput);
          } else {
            newRole = await Role.findOne({ name: String(roleInput).toLowerCase().trim() });
          }

          if (!newRole || !ALLOWED_STAFF_ROLES.includes(newRole.name)) {
            return res.status(400).json({
              success: false,
              message: `Invalid staff role. Permitted staff roles are: ${ALLOWED_STAFF_ROLES.join(", ")}`,
            });
          }
          user.role = newRole._id;
        }

        // Update password if provided
        if (password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
      }
    }

    const updatedProfile = await StaffProfile.findById(profile._id).populate({
      path: "user",
      select: "-password",
      populate: { path: "role" },
    });

    return res.status(200).json({
      success: true,
      message: "Staff member updated successfully.",
      staff: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to update staff member: ${error.message}`,
    });
  }
};

// @desc    Delete staff profile and linked user account (ADMIN ONLY)
// @route   DELETE /api/staff/:id
// @access  Protected (Admin only)
const deleteStaffProfile = async (req, res) => {
  try {
    const { id } = req.params;

    let profile = await StaffProfile.findById(id);
    if (!profile) {
      profile = await StaffProfile.findOne({ user: id });
    }

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found.",
      });
    }

    const userId = profile.user;

    await StaffProfile.findByIdAndDelete(profile._id);
    if (userId) {
      await User.findByIdAndDelete(userId);
    }

    return res.status(200).json({
      success: true,
      message: "Staff member and user account deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete staff member: ${error.message}`,
    });
  }
};

module.exports = {
  createStaffProfile,
  getStaffProfiles,
  getStaffProfileById,
  updateStaffProfile,
  deleteStaffProfile,
};
