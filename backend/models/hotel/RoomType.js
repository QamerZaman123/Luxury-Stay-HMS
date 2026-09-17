const mongoose = require("mongoose");

const roomTypeSchema = new mongoose.Schema(
  {
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    basePrice: { type: Number, required: true, min: 0 },
    maxOccupancy: { type: Number, required: true, min: 1 },
    bedType: { type: String, trim: true },
    size: { type: Number, min: 0 },
    sizeUnit: { type: String, trim: true },
    amenities: [{ type: String, trim: true }],
    images: [{ type: String, trim: true }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RoomType", roomTypeSchema);
