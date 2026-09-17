const mongoose = require("mongoose");

const guestProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    dateOfBirth: Date,
    gender: { type: String, trim: true },
    nationality: { type: String, trim: true },
    address: { street: String, city: String, state: String, country: String, postalCode: String },
    preferences: { roomPreference: String, bedPreference: String, foodPreference: String, smokingPreference: String, specialRequests: String },
    identification: { documentType: String, documentNumber: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GuestProfile", guestProfileSchema);
