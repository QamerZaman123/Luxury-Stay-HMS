const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    description: { type: String, trim: true },
    address: { street: String, city: String, state: String, country: String, postalCode: String },
    contact: { phone: String, email: { type: String, lowercase: true, trim: true } },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    checkInTime: String,
    checkOutTime: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
