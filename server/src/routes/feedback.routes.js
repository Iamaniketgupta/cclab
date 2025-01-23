import { Router } from "express";
import { getAllFeedback, getAllFeedbackbyUserId, sendFeedback } from "../controllers/feedback.controller.js";
import { verifyAuth } from "../middlewares/auth.js";

const feedbackRouter = Router();

feedbackRouter.post('/send',verifyAuth,sendFeedback);
feedbackRouter.get('/all',verifyAuth,getAllFeedback);
feedbackRouter.get('/user/all',verifyAuth,getAllFeedbackbyUserId);

export default feedbackRouter