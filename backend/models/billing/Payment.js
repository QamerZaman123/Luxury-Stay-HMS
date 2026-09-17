const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice", required: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    guest: { type: mongoose.Schema.Types.ObjectId, ref: "GuestProfile", required: true },
    amount: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, required: true, enum: ["cash", "credit_card", "debit_card", "bank_transfer", "online"] },
    transactionId: { type: String, unique: true, sparse: true, trim: true },
    status: { type: String, enum: ["pending", "completed", "failed", "refunded"], default: "pending" },
    paidAt: { type: Date, default: null },
    processedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
