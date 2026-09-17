const express = require("express");
const reportRoutes = express.Router();
const { getOccupancyReport, getRevenueReport, getFeedbackReport } = require("../../controllers/operations/reportController");

reportRoutes.get("/occupancy", getOccupancyReport);
reportRoutes.get("/revenue", getRevenueReport);
reportRoutes.get("/feedback", getFeedbackReport);

module.exports = reportRoutes;
