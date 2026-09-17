const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true, trim: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    guest: { type: mongoose.Schema.Types.ObjectId, ref: "GuestProfile", required: true },
    stay: { type: mongoose.Schema.Types.ObjectId, ref: "Stay" },
    reservation: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation" },
    items: [{ description: { type: String, required: true }, category: String, quantity: { type: Number, required: true, min: 1 }, unitPrice: { type: Number, required: true, min: 0 }, total: { type: Number, required: true, min: 0 } }],
    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    amountPaid: { type: Number, default: 0, min: 0 },
    amountDue: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["draft", "unpaid", "partially_paid", "paid", "cancelled"], default: "draft" },
    issuedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
