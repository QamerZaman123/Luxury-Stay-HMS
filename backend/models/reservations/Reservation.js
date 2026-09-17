const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    reservationNumber: { type: String, required: true, unique: true, trim: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    guest: { type: mongoose.Schema.Types.ObjectId, ref: "GuestProfile", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    roomType: { type: mongoose.Schema.Types.ObjectId, ref: "RoomType", required: true },
    bookingSource: { type: String, enum: ["website", "receptionist", "phone", "walk_in"], required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true, min: 1 },
    adults: { type: Number, required: true, min: 1 },
    children: { type: Number, default: 0, min: 0 },
    numberOfNights: { type: Number, required: true, min: 1 },
    pricePerNight: { type: Number, required: true, min: 0 },
    subtotal: { type: Number, required: true, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["pending", "confirmed", "cancelled", "checked_in", "checked_out", "no_show"], default: "pending" },
    specialRequests: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
