const express = require("express");
const authRoutes = express.Router();
const {
  register,
  login,
  logout,
  getMe,
} = require("../../controllers/auth/authController");
const { protect } = require("../../middleware/authMiddleware");

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/me", protect, getMe);

module.exports = authRoutes;
