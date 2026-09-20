const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/identity/User");
const Role = require("../../models/identity/Role");
const GuestProfile = require("../../models/identity/GuestProfile");
const StaffProfile = require("../../models/identity/StaffProfile");

const generateTokenAndSetCookie = (res, user) => {
  const roleName = user.role?.name || user.role;
  const token = jwt.sign(
    { userId: user._id, role: roleName },
    process.env.JWT_SECRET || "luxurystay_hms_jwt_secure_key_super_secret_2026",
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  const isProduction = process.env.NODE_ENV === "production";
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  res.cookie("token", token, cookieOptions);
  return token;
};

// @desc    Register a new guest account (strictly guest role only)
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      dateOfBirth,
      gender,
      nationality,
      address,
      preferences,
      identification,
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

    // Role assignment is strictly controlled by backend: guests can only register as guest
    let guestRole = await Role.findOne({ name: "guest" });
    if (!guestRole) {
      guestRole = await Role.create({
        name: "guest",
        description: "Guest portal access",
        permissions: ["manage_own_reservations"],
        isActive: true,
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
      role: guestRole._id,
      status: "active",
      lastLoginAt: new Date(),
    });

    const guestProfile = await GuestProfile.create({
      user: newUser._id,
      dateOfBirth: dateOfBirth || null,
      gender: gender || undefined,
      nationality: nationality || undefined,
      address: address || undefined,
      preferences: preferences || undefined,
      identification: identification || undefined,
    });

    const populatedUser = await User.findById(newUser._id)
      .populate("role")
      .select("-password");

    generateTokenAndSetCookie(res, populatedUser);

    return res.status(201).json({
      success: true,
      message: "Guest registered successfully.",
      user: populatedUser,
      profile: guestProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Registration failed: ${error.message}`,
    });
  }
};

// @desc    Log in with email & password
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).populate("role");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: `Account is ${user.status}. Please contact administration.`,
      });
    }

    if (!user.role || user.role.isActive === false) {
      return res.status(403).json({
        success: false,
        message: "Your assigned role is inactive. Please contact administration.",
      });
    }

    user.lastLoginAt = new Date();
    await user.save();

    generateTokenAndSetCookie(res, user);

    const safeUser = user.toObject();
    delete safeUser.password;

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Login failed: ${error.message}`,
    });
  }
};

// @desc    Log out user by clearing the HttpOnly auth cookie
// @route   POST /api/auth/logout
// @access  Public / Protected
const logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Logout failed: ${error.message}`,
    });
  }
};

// @desc    Get current authenticated user profile
// @route   GET /api/auth/me
// @access  Protected
const getMe = async (req, res) => {
  try {
    const user = req.user;
    let profile = null;

    const roleName = user.role?.name;
    if (roleName === "guest") {
      profile = await GuestProfile.findOne({ user: user._id });
    } else {
      profile = await StaffProfile.findOne({ user: user._id });
    }

    return res.status(200).json({
      success: true,
      user,
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to retrieve user profile: ${error.message}`,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
};
