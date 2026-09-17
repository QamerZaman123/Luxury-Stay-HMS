const express = require("express");
const roomTypeRoutes = express.Router();
const { createRoomType, getRoomTypes, getRoomTypeById, updateRoomType, deleteRoomType } = require("../../controllers/hotel/roomTypeController");

roomTypeRoutes.post("/", createRoomType);
roomTypeRoutes.get("/", getRoomTypes);
roomTypeRoutes.get("/:id", getRoomTypeById);
roomTypeRoutes.put("/:id", updateRoomType);
roomTypeRoutes.delete("/:id", deleteRoomType);

module.exports = roomTypeRoutes;
