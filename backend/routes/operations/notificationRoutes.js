const express = require("express");
const notificationRoutes = express.Router();
const { createNotification, getNotifications, getNotificationById, updateNotification, deleteNotification } = require("../../controllers/operations/notificationController");

notificationRoutes.post("/", createNotification);
notificationRoutes.get("/", getNotifications);
notificationRoutes.get("/:id", getNotificationById);
notificationRoutes.put("/:id", updateNotification);
notificationRoutes.delete("/:id", deleteNotification);

module.exports = notificationRoutes;
