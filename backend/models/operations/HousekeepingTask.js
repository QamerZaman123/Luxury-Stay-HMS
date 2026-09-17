const mongoose = require("mongoose");

const housekeepingTaskSchema = new mongoose.Schema(
  {
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, trim: true },
    priority: { type: String, enum: ["low", "normal", "high", "urgent"], default: "normal" },
    status: { type: String, enum: ["pending", "assigned", "in_progress", "completed", "cancelled"], default: "pending" },
    scheduledAt: Date,
    startedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
    notes: { type: String, trim: true },
    reportedIssues: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("HousekeepingTask", housekeepingTaskSchema);
