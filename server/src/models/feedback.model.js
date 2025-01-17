//  This schema handles the Feedbacks
import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab', required: true },
    feedback: { type: String, required: true }
    
  }, { timestamps: true });
  
  const Feedback = mongoose.model('Feedback', FeedbackSchema);
  
  export default Feedback