const express = require("express");
const reservationRoutes = express.Router();
const { createReservation, getReservations, getReservationById, updateReservation, deleteReservation } = require("../../controllers/reservation/reservationController");

reservationRoutes.post("/", createReservation);
reservationRoutes.get("/", getReservations);
reservationRoutes.get("/:id", getReservationById);
reservationRoutes.put("/:id", updateReservation);
reservationRoutes.delete("/:id", deleteReservation);

module.exports = reservationRoutes;
