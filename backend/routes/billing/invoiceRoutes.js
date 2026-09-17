const express = require("express");
const invoiceRoutes = express.Router();
const { createInvoice, getInvoices, getInvoiceById, updateInvoice, deleteInvoice } = require("../../controllers/billing/invoiceController");

invoiceRoutes.post("/", createInvoice);
invoiceRoutes.get("/", getInvoices);
invoiceRoutes.get("/:id", getInvoiceById);
invoiceRoutes.put("/:id", updateInvoice);
invoiceRoutes.delete("/:id", deleteInvoice);

module.exports = invoiceRoutes;
