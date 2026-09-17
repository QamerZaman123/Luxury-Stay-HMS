const express = require("express");
const paymentRoutes = express.Router();
const { createPayment, getPayments, getPaymentById, updatePayment, deletePayment } = require("../../controllers/billing/paymentController");

paymentRoutes.post("/", createPayment);
paymentRoutes.get("/", getPayments);
paymentRoutes.get("/:id", getPaymentById);
paymentRoutes.put("/:id", updatePayment);
paymentRoutes.delete("/:id", deletePayment);

module.exports = paymentRoutes;
