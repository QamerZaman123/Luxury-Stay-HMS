const express = require("express");
const roomRoutes = express.Router();
const { createRoom, getRooms, getRoomById, updateRoom, deleteRoom } = require("../../controllers/hotel/roomController");

roomRoutes.post("/", createRoom);
roomRoutes.get("/", getRooms);
roomRoutes.get("/:id", getRoomById);
roomRoutes.put("/:id", updateRoom);
roomRoutes.delete("/:id", deleteRoom);

module.exports = roomRoutes;
