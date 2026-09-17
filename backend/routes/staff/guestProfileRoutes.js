const express = require("express");
const guestProfileRoutes = express.Router();
const { createGuestProfile, getGuestProfiles, getGuestProfileById, updateGuestProfile, deleteGuestProfile } = require("../../controllers/staff/guestProfileController");

guestProfileRoutes.post("/", createGuestProfile);
guestProfileRoutes.get("/", getGuestProfiles);
guestProfileRoutes.get("/:id", getGuestProfileById);
guestProfileRoutes.put("/:id", updateGuestProfile);
guestProfileRoutes.delete("/:id", deleteGuestProfile);

module.exports = guestProfileRoutes;
