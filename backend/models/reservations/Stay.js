const mongoose = require("mongoose");

const staySchema = new mongoose.Schema(
  {
    reservation: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation", required: true },
    guest: { type: mongoose.Schema.Types.ObjectId, ref: "GuestProfile", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    actualCheckIn: Date,
    actualCheckOut: { type: Date, default: null },
    checkedInBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    checkedOutBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    keyIssued: { type: Boolean, default: false },
    keyCount: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: ["active", "completed", "cancelled"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stay", staySchema);
