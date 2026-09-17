const express = require("express");
const serviceOrderRoutes = express.Router();
const { createServiceOrder, getServiceOrders, getServiceOrderById, updateServiceOrder, deleteServiceOrder } = require("../../controllers/billing/serviceOrderController");

serviceOrderRoutes.post("/", createServiceOrder);
serviceOrderRoutes.get("/", getServiceOrders);
serviceOrderRoutes.get("/:id", getServiceOrderById);
serviceOrderRoutes.put("/:id", updateServiceOrder);
serviceOrderRoutes.delete("/:id", deleteServiceOrder);

module.exports = serviceOrderRoutes;
