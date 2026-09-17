const express = require("express");
const serviceRoutes = express.Router();
const { createService, getServices, getServiceById, updateService, deleteService } = require("../../controllers/billing/serviceController");

serviceRoutes.post("/", createService);
serviceRoutes.get("/", getServices);
serviceRoutes.get("/:id", getServiceById);
serviceRoutes.put("/:id", updateService);
serviceRoutes.delete("/:id", deleteService);

module.exports = serviceRoutes;
