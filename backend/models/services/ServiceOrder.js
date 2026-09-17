const mongoose = require("mongoose");

const serviceOrderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true, trim: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    guest: { type: mongoose.Schema.Types.ObjectId, ref: "GuestProfile", required: true },
    stay: { type: mongoose.Schema.Types.ObjectId, ref: "Stay" },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["requested", "confirmed", "in_progress", "completed", "cancelled"], default: "requested" },
    requestedAt: { type: Date, default: Date.now },
    completedAt: { type: Date, default: null },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceOrder", serviceOrderSchema);
