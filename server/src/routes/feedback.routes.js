import { Router } from "express";
import { getAllFeedback, sendFeedback } from "../controllers/feedback.controller.js";
import { verifyAuth } from "../middlewares/auth.js";

const feedbackRouter = Router();

feedbackRouter.post('/send',verifyAuth,sendFeedback);
feedbackRouter.get('/get/:labId',verifyAuth,getAllFeedback);

export default feedbackRouter