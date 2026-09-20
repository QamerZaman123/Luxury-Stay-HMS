const express = require("express");
const guestProfileRoutes = express.Router();
const {
  createGuestProfile,
  getGuestProfiles,
  getGuestProfileById,
  updateGuestProfile,
  deleteGuestProfile,
} = require("../../controllers/staff/guestProfileController");
const { protect } = require("../../middleware/authMiddleware");
const { requireRole } = require("../../middleware/roleMiddleware");

// All guest profile routes require authentication
guestProfileRoutes.use(protect);

guestProfileRoutes.post("/", createGuestProfile);
guestProfileRoutes.get("/", requireRole("admin", "manager", "receptionist"), getGuestProfiles);
guestProfileRoutes.get("/:id", getGuestProfileById);
guestProfileRoutes.put("/:id", updateGuestProfile);
guestProfileRoutes.delete("/:id", requireRole("admin"), deleteGuestProfile);

module.exports = guestProfileRoutes;
