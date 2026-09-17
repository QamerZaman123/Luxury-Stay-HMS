const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    roomNumber: { type: String, required: true, trim: true },
    title: { type: String, trim: true },
    roomType: { type: mongoose.Schema.Types.ObjectId, ref: "RoomType", required: true },
    floor: { type: String, trim: true },
    wing: { type: String, trim: true },
    status: { type: String, enum: ["available", "reserved", "occupied", "cleaning", "maintenance", "out_of_service"], default: "available" },
    price: { type: Number, min: 0 },
    description: { type: String, trim: true },
    amenities: [{ type: String, trim: true }],
    images: [{ type: String, trim: true }],
    currentGuest: { type: mongoose.Schema.Types.ObjectId, ref: "GuestProfile", default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

roomSchema.index({ hotel: 1, roomNumber: 1 }, { unique: true });

module.exports = mongoose.model("Room", roomSchema);
