const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    pricingType: { type: String, trim: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
