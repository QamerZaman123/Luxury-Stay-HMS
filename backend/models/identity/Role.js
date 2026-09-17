const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, enum: ["admin", "manager", "receptionist", "housekeeping", "maintenance", "guest"] },
    description: { type: String, trim: true },
    permissions: [{ type: String, trim: true }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
