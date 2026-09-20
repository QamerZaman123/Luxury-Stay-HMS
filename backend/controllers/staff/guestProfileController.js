const GuestProfile = require("../../models/identity/GuestProfile");
const User = require("../../models/identity/User");

// @desc    Create a guest profile
// @route   POST /api/guest-profiles
// @access  Protected (Admin, Manager, Receptionist, or Guest for themselves)
const createGuestProfile = async (req, res) => {
  try {
    const {
      userId,
      dateOfBirth,
      gender,
      nationality,
      address,
      preferences,
      identification,
    } = req.body;

    const currentRole = req.user.role?.name;
    const targetUserId = userId || req.user._id;

    if (
      currentRole !== "admin" &&
      currentRole !== "manager" &&
      currentRole !== "receptionist" &&
      req.user._id.toString() !== targetUserId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to create a guest profile for this user.",
      });
    }

    const existingProfile = await GuestProfile.findOne({ user: targetUserId });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "A guest profile already exists for this user.",
      });
    }

    const guestProfile = await GuestProfile.create({
      user: targetUserId,
      dateOfBirth,
      gender,
      nationality,
      address,
      preferences,
      identification,
    });

    const populated = await GuestProfile.findById(guestProfile._id).populate({
      path: "user",
      select: "-password",
      populate: { path: "role" },
    });

    return res.status(201).json({
      success: true,
      guestProfile: populated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to create guest profile: ${error.message}`,
    });
  }
};

// @desc    Get all guest profiles
// @route   GET /api/guest-profiles
// @access  Protected (Admin, Manager, Receptionist)
const getGuestProfiles = async (req, res) => {
  try {
    const profiles = await GuestProfile.find()
      .populate({
        path: "user",
        select: "-password",
        populate: { path: "role" },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: profiles.length,
      guestProfiles: profiles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch guest profiles: ${error.message}`,
    });
  }
};

// @desc    Get guest profile by ID or User ID
// @route   GET /api/guest-profiles/:id
// @access  Protected (Admin, Manager, Receptionist, or Guest for self)
const getGuestProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const currentRole = req.user.role?.name;

    let profile = await GuestProfile.findById(id).populate({
      path: "user",
      select: "-password",
      populate: { path: "role" },
    });

    if (!profile) {
      profile = await GuestProfile.findOne({ user: id }).populate({
        path: "user",
        select: "-password",
        populate: { path: "role" },
      });
    }

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Guest profile not found.",
      });
    }

    const isSelf = profile.user && profile.user._id.toString() === req.user._id.toString();
    const isStaff = ["admin", "manager", "receptionist"].includes(currentRole);

    if (!isStaff && !isSelf) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only view your own guest profile.",
      });
    }

    return res.status(200).json({
      success: true,
      guestProfile: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch guest profile: ${error.message}`,
    });
  }
};

// @desc    Update guest profile
// @route   PUT /api/guest-profiles/:id
// @access  Protected (Admin, Manager, Receptionist, or Guest for self)
const updateGuestProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const currentRole = req.user.role?.name;

    let profile = await GuestProfile.findById(id);
    if (!profile) {
      profile = await GuestProfile.findOne({ user: id });
    }

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Guest profile not found.",
      });
    }

    const isSelf = profile.user.toString() === req.user._id.toString();
    const isStaff = ["admin", "manager", "receptionist"].includes(currentRole);

    if (!isStaff && !isSelf) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only update your own guest profile.",
      });
    }

    const {
      dateOfBirth,
      gender,
      nationality,
      address,
      preferences,
      identification,
    } = req.body;

    if (dateOfBirth !== undefined) profile.dateOfBirth = dateOfBirth;
    if (gender !== undefined) profile.gender = gender;
    if (nationality !== undefined) profile.nationality = nationality;
    if (address !== undefined) profile.address = address;
    if (preferences !== undefined) profile.preferences = preferences;
    if (identification !== undefined) profile.identification = identification;

    await profile.save();

    const updated = await GuestProfile.findById(profile._id).populate({
      path: "user",
      select: "-password",
      populate: { path: "role" },
    });

    return res.status(200).json({
      success: true,
      message: "Guest profile updated successfully.",
      guestProfile: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to update guest profile: ${error.message}`,
    });
  }
};

// @desc    Delete guest profile (ADMIN ONLY)
// @route   DELETE /api/guest-profiles/:id
// @access  Protected (Admin only)
const deleteGuestProfile = async (req, res) => {
  try {
    const { id } = req.params;

    let profile = await GuestProfile.findById(id);
    if (!profile) {
      profile = await GuestProfile.findOne({ user: id });
    }

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Guest profile not found.",
      });
    }

    await GuestProfile.findByIdAndDelete(profile._id);

    return res.status(200).json({
      success: true,
      message: "Guest profile deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete guest profile: ${error.message}`,
    });
  }
};

module.exports = {
  createGuestProfile,
  getGuestProfiles,
  getGuestProfileById,
  updateGuestProfile,
  deleteGuestProfile,
};
