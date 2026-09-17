const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    guest: { type: mongoose.Schema.Types.ObjectId, ref: "GuestProfile", required: true },
    reservation: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation" },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true },
    comment: { type: String, trim: true },
    categories: {
      cleanliness: { type: Number, min: 1, max: 5 },
      service: { type: Number, min: 1, max: 5 },
      roomQuality: { type: Number, min: 1, max: 5 },
      staff: { type: Number, min: 1, max: 5 },
    },
    status: { type: String, enum: ["pending", "published", "hidden"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
