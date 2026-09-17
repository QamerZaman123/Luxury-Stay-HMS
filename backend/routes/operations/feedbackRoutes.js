const express = require("express");
const feedbackRoutes = express.Router();
const { createFeedback, getFeedback, getFeedbackById, updateFeedback, deleteFeedback } = require("../../controllers/operations/feedbackController");

feedbackRoutes.post("/", createFeedback);
feedbackRoutes.get("/", getFeedback);
feedbackRoutes.get("/:id", getFeedbackById);
feedbackRoutes.put("/:id", updateFeedback);
feedbackRoutes.delete("/:id", deleteFeedback);

module.exports = feedbackRoutes;
