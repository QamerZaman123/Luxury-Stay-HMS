const mongoose = require("mongoose");

const maintenanceRequestSchema = new mongoose.Schema(
  {
    requestNumber: { type: String, required: true, unique: true, trim: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: String, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    priority: { type: String, enum: ["low", "normal", "high", "urgent"], default: "normal" },
    status: { type: String, enum: ["reported", "assigned", "in_progress", "resolved", "closed"], default: "reported" },
    reportedAt: { type: Date, default: Date.now },
    resolvedAt: { type: Date, default: null },
    resolutionNotes: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MaintenanceRequest", maintenanceRequestSchema);
