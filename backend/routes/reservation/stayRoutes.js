const express = require("express");
const stayRoutes = express.Router();
const { createStay, getStays, getStayById, updateStay, deleteStay } = require("../../controllers/reservation/stayController");

stayRoutes.post("/", createStay);
stayRoutes.get("/", getStays);
stayRoutes.get("/:id", getStayById);
stayRoutes.put("/:id", updateStay);
stayRoutes.delete("/:id", deleteStay);

module.exports = stayRoutes;
