const express = require("express");
const hotelRoutes = express.Router();
const { createHotel, getHotels, getHotelById, updateHotel, deleteHotel } = require("../../controllers/hotel/hotelController");

hotelRoutes.post("/", createHotel);
hotelRoutes.get("/", getHotels);
hotelRoutes.get("/:id", getHotelById);
hotelRoutes.put("/:id", updateHotel);
hotelRoutes.delete("/:id", deleteHotel);

module.exports = hotelRoutes;
