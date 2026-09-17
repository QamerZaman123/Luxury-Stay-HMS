const express = require("express");
const maintenanceRoutes = express.Router();
const { createMaintenanceRequest, getMaintenanceRequests, getMaintenanceRequestById, updateMaintenanceRequest, deleteMaintenanceRequest } = require("../../controllers/operations/maintenanceController");

maintenanceRoutes.post("/", createMaintenanceRequest);
maintenanceRoutes.get("/", getMaintenanceRequests);
maintenanceRoutes.get("/:id", getMaintenanceRequestById);
maintenanceRoutes.put("/:id", updateMaintenanceRequest);
maintenanceRoutes.delete("/:id", deleteMaintenanceRequest);

module.exports = maintenanceRoutes;
