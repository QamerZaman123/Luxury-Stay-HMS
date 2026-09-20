const express = require("express");
const staffRoutes = express.Router();
const {
  createStaffProfile,
  getStaffProfiles,
  getStaffProfileById,
  updateStaffProfile,
  deleteStaffProfile,
} = require("../../controllers/staff/staffController");
const { protect } = require("../../middleware/authMiddleware");
const { requireRole } = require("../../middleware/roleMiddleware");

// All staff routes require authentication
staffRoutes.use(protect);

// Strictly Admin can create staff profiles and staff accounts
staffRoutes.post("/", requireRole("admin"), createStaffProfile);

// Admin and Manager can view staff listings
staffRoutes.get("/", requireRole("admin", "manager"), getStaffProfiles);
staffRoutes.get("/:id", requireRole("admin", "manager"), getStaffProfileById);

// Strictly Admin can update or delete staff accounts
staffRoutes.put("/:id", requireRole("admin"), updateStaffProfile);
staffRoutes.delete("/:id", requireRole("admin"), deleteStaffProfile);

module.exports = staffRoutes;
