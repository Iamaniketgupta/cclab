import asyncHandler from "express-async-handler";
import Feedback from "../models/feedback.model.js";
import Lab from "../models/lab.model.js";


// Send Feedback
export const sendFeedback = asyncHandler(async (req, res) => {
  const { labId, feedback } = req.body;

  // check if already submitted
  const existingFeedback = await Feedback.findOne({ userId: req.user._id, labId });
  if (existingFeedback) {
    const feedbackDate = new Date(existingFeedback.createdAt);
    const currentDate = new Date();
    const diffInMonths = (currentDate.getFullYear() - feedbackDate.getFullYear()) * 12 + (currentDate.getMonth() - feedbackDate.getMonth());
    if (diffInMonths < 6) {
      return res.status(400).json({ message: "You have already submitted feedback for this lab" });
    }
  }

  if (!labId || !feedback) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const labInfo = await Lab.findById(labId);

  if (!labInfo) {
    return res.status(404).json({ message: "Lab not found" });
  }

  if (!labInfo.feedbackActive) {
    return res.status(400).json({ message: "Feedbacks are disabled for this lab" });
  }

  const newFeedback = new Feedback({
    userId: req.user._id,
    labId,
    feedback,
  });

  try {
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully", newFeedback });
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback", error: error.message });
  }
});

// Get All Feedback
export const getAllFeedback = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await Feedback.find({})
      .populate("labId", "labName labCode block floor");
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving feedbacks", error: error.message });
  }
});


// Get All Feedback by User Id
export const getAllFeedbackbyUserId = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.user._id })
      .populate("labId", "labName labCode block floor");
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving feedbacks", error: error.message });
  }
});

