const bcrypt = require("bcryptjs");
const User = require("../../models/identity/User");
const Role = require("../../models/identity/Role");
const StaffProfile = require("../../models/identity/StaffProfile");
const GuestProfile = require("../../models/identity/GuestProfile");

// @desc    Get all users
// @route   GET /api/users
// @access  Protected (Admin, Manager)
const getUsers = async (req, res) => {
  try {
    const { role, status, search } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }

    if (role) {
      let roleDoc = null;
      if (typeof role === "string" && role.match(/^[0-9a-fA-F]{24}$/)) {
        roleDoc = await Role.findById(role);
      } else {
        roleDoc = await Role.findOne({ name: role.toLowerCase() });
      }
      if (roleDoc) {
        query.role = roleDoc._id;
      }
    }

    let users = await User.find(query)
      .populate("role")
      .select("-password")
      .sort({ createdAt: -1 });

    if (search) {
      const term = search.toLowerCase();
      users = users.filter((u) => {
        const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
        const email = u.email.toLowerCase();
        const phone = u.phone ? u.phone.toLowerCase() : "";
        return (
          fullName.includes(term) ||
          email.includes(term) ||
          phone.includes(term)
        );
      });
    }

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch users: ${error.message}`,
    });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Protected (Admin, Manager, or Self)
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const currentRole = req.user.role?.name;
    const isSelf = req.user._id.toString() === id;

    if (currentRole !== "admin" && currentRole !== "manager" && !isSelf) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only view your own user profile.",
      });
    }

    const user = await User.findById(id).populate("role").select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch user: ${error.message}`,
    });
  }
};

// @desc    Create a new user (ADMIN ONLY)
// @route   POST /api/users
// @access  Protected (Admin only)
const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      role: roleInput,
      status,
    } = req.body;

    if (!firstName || !lastName || !email || !password || !roleInput) {
      return res.status(400).json({
        success: false,
        message: "firstName, lastName, email, password, and role are required.",
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

    let roleDoc = null;
    if (typeof roleInput === "string" && roleInput.match(/^[0-9a-fA-F]{24}$/)) {
      roleDoc = await Role.findById(roleInput);
    } else {
      roleDoc = await Role.findOne({ name: String(roleInput).toLowerCase().trim() });
    }

    if (!roleDoc) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone ? phone.trim() : undefined,
      role: roleDoc._id,
      status: status || "active",
    });

    const populatedUser = await User.findById(newUser._id)
      .populate("role")
      .select("-password");

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: populatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to create user: ${error.message}`,
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Protected (Admin, or Self with restrictions)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const currentRole = req.user.role?.name;
    const isSelf = req.user._id.toString() === id;
    const isAdmin = currentRole === "admin";

    if (!isAdmin && !isSelf) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only update your own profile.",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const { firstName, lastName, phone, password, role: roleInput, status } = req.body;

    if (firstName) user.firstName = firstName.trim();
    if (lastName) user.lastName = lastName.trim();
    if (phone !== undefined) user.phone = phone ? phone.trim() : null;

    // Secure password update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Role and status can ONLY be changed by Admin
    if (isAdmin) {
      if (status && ["active", "inactive", "suspended"].includes(status)) {
        user.status = status;
      }

      if (roleInput) {
        let roleDoc = null;
        if (typeof roleInput === "string" && roleInput.match(/^[0-9a-fA-F]{24}$/)) {
          roleDoc = await Role.findById(roleInput);
        } else {
          roleDoc = await Role.findOne({ name: String(roleInput).toLowerCase().trim() });
        }

        if (roleDoc) {
          user.role = roleDoc._id;
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid role specified.",
          });
        }
      }
    }

    await user.save();

    const updatedUser = await User.findById(id)
      .populate("role")
      .select("-password");

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to update user: ${error.message}`,
    });
  }
};

// @desc    Activate or deactivate user account (ADMIN ONLY)
// @route   PATCH /api/users/:id/status
// @access  Protected (Admin only)
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["active", "inactive", "suspended"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'active', 'inactive', or 'suspended'.",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.status = status;
    await user.save();

    const updatedUser = await User.findById(id)
      .populate("role")
      .select("-password");

    return res.status(200).json({
      success: true,
      message: `User status changed to '${status}'.`,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to update user status: ${error.message}`,
    });
  }
};

// @desc    Delete user (ADMIN ONLY)
// @route   DELETE /api/users/:id
// @access  Protected (Admin only)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from accidentally deleting themselves
    if (req.user._id.toString() === id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own admin account.",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await User.findByIdAndDelete(id);
    await StaffProfile.findOneAndDelete({ user: id });
    await GuestProfile.findOneAndDelete({ user: id });

    return res.status(200).json({
      success: true,
      message: "User and associated profiles deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete user: ${error.message}`,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  deleteUser,
};
