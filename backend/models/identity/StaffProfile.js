const mongoose = require("mongoose");

const staffProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    employeeId: { type: String, required: true, unique: true, trim: true },
    department: { type: String, required: true, enum: ["management", "reception", "housekeeping", "maintenance", "administration"] },
    position: { type: String, trim: true },
    joiningDate: Date,
    emergencyContact: { name: String, phone: String, relationship: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StaffProfile", staffProfileSchema);
