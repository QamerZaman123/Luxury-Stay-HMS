const express = require("express");
const authRoutes = express.Router();
const { register, login, logout } = require("../../controllers/auth/authController");

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);

module.exports = authRoutes;
