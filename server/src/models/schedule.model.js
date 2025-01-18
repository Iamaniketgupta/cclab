// This handles the Lab time table class schedules or events

import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  class: { type: String, required: true },
  facultyName: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  purpose: { type: String, required: true },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'canceled'],
    default: 'scheduled'
  }
}, { timestamps: true });

const Schedule = mongoose.model('Schedule', ScheduleSchema);

export default Schedule