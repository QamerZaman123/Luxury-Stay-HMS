const express = require("express");
const userRoutes = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  deleteUser,
} = require("../../controllers/auth/userController");
const { protect } = require("../../middleware/authMiddleware");
const { requireRole } = require("../../middleware/roleMiddleware");

// All user management routes require authentication
userRoutes.use(protect);

userRoutes.post("/", requireRole("admin"), createUser);
userRoutes.get("/", requireRole("admin", "manager"), getUsers);
userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", updateUser);
userRoutes.patch("/:id/status", requireRole("admin"), updateUserStatus);
userRoutes.delete("/:id", requireRole("admin"), deleteUser);

module.exports = userRoutes;
