const mongoose = require("mongoose");

const systemSettingSchema = new mongoose.Schema(
  {
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true, unique: true },
    hotelName: { type: String, required: true, trim: true },
    contact: { email: { type: String, lowercase: true, trim: true }, phone: String, address: String },
    currency: { type: String, required: true, trim: true },
    tax: { name: String, percentage: { type: Number, min: 0 }, isActive: { type: Boolean, default: true } },
    policies: { checkInTime: String, checkOutTime: String, cancellationPolicy: String },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SystemSetting", systemSettingSchema);
