import asyncHandler from "express-async-handler";
import Feedback from "../models/feedback.model";
import Lab from "../models/lab.model";


// Send Feedback
export const sendFeedback = asyncHandler(async (req, res) => {
  const { userId, labId, feedback } = req.body;

  if (!userId || !labId || !feedback) {
    return res.status(400).json({ message: "All fields are required" });
  }
 
  const labInfo = await Lab.findById(labId);

  if (!labInfo) {
    return res.status(404).json({ message: "Lab not found" });
  }

  if(!labInfo.feedbackActive){
    return res.status(400).json({ message: "Feedbacks are disabled for this lab" });
  }

  const newFeedback = new Feedback({
    userId,
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
    const labId = req.params.labId;
    const feedbacks = await Feedback.find({labId})
      .populate("userId", "name email rollNumber") 
      .populate("labId", "labName labCode block floor");  
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving feedbacks", error: error.message });
  }
});
