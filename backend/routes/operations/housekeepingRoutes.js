const express = require("express");
const housekeepingRoutes = express.Router();
const { createHousekeepingTask, getHousekeepingTasks, getHousekeepingTaskById, updateHousekeepingTask, deleteHousekeepingTask } = require("../../controllers/operations/housekeepingController");

housekeepingRoutes.post("/", createHousekeepingTask);
housekeepingRoutes.get("/", getHousekeepingTasks);
housekeepingRoutes.get("/:id", getHousekeepingTaskById);
housekeepingRoutes.put("/:id", updateHousekeepingTask);
housekeepingRoutes.delete("/:id", deleteHousekeepingTask);

module.exports = housekeepingRoutes;
