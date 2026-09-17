const express = require("express");
const staffRoutes = express.Router();
const { createStaffProfile, getStaffProfiles, getStaffProfileById, updateStaffProfile, deleteStaffProfile } = require("../../controllers/staff/staffController");

staffRoutes.post("/", createStaffProfile);
staffRoutes.get("/", getStaffProfiles);
staffRoutes.get("/:id", getStaffProfileById);
staffRoutes.put("/:id", updateStaffProfile);
staffRoutes.delete("/:id", deleteStaffProfile);

module.exports = staffRoutes;
