const Role = require("../../models/identity/Role");
const User = require("../../models/identity/User");

// @desc    Create a new role (ADMIN ONLY)
// @route   POST /api/roles
// @access  Protected (Admin only)
const createRole = async (req, res) => {
  try {
    const { name, description, permissions, isActive } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Role name is required.",
      });
    }

    const existing = await Role.findOne({ name: name.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Role '${name}' already exists.`,
      });
    }

    const role = await Role.create({
      name: name.toLowerCase().trim(),
      description,
      permissions: permissions || [],
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({
      success: true,
      role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to create role: ${error.message}`,
    });
  }
};

// @desc    Get all roles
// @route   GET /api/roles
// @access  Protected (Admin, Manager)
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().sort({ name: 1 });
    return res.status(200).json({
      success: true,
      count: roles.length,
      roles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch roles: ${error.message}`,
    });
  }
};

// @desc    Get role by ID
// @route   GET /api/roles/:id
// @access  Protected (Admin, Manager)
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found.",
      });
    }

    return res.status(200).json({
      success: true,
      role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch role: ${error.message}`,
    });
  }
};

// @desc    Update role (ADMIN ONLY)
// @route   PUT /api/roles/:id
// @access  Protected (Admin only)
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, permissions, isActive } = req.body;

    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found.",
      });
    }

    if (description !== undefined) role.description = description;
    if (permissions !== undefined) role.permissions = permissions;
    if (isActive !== undefined) role.isActive = isActive;

    await role.save();

    return res.status(200).json({
      success: true,
      message: "Role updated successfully.",
      role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to update role: ${error.message}`,
    });
  }
};

// @desc    Delete role (ADMIN ONLY)
// @route   DELETE /api/roles/:id
// @access  Protected (Admin only)
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found.",
      });
    }

    const assignedUsers = await User.countDocuments({ role: id });
    if (assignedUsers > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete role '${role.name}' because it is assigned to ${assignedUsers} user(s).`,
      });
    }

    await Role.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: `Role '${role.name}' deleted successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete role: ${error.message}`,
    });
  }
};

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
