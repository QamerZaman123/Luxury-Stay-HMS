const express = require("express");
const systemSettingRoutes = express.Router();
const { createSystemSetting, getSystemSettings, getSystemSettingById, updateSystemSetting, deleteSystemSetting } = require("../../controllers/operations/systemSettingController");

systemSettingRoutes.post("/", createSystemSetting);
systemSettingRoutes.get("/", getSystemSettings);
systemSettingRoutes.get("/:id", getSystemSettingById);
systemSettingRoutes.put("/:id", updateSystemSetting);
systemSettingRoutes.delete("/:id", deleteSystemSetting);

module.exports = systemSettingRoutes;
