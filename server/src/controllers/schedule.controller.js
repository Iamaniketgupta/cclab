import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Schedule from "../models/schedule.model.js";
 
// Create a new schedule
export const createNewSchedule = asyncHandler(async (req, res) => {
  const { labId, userId, date, class: className, facultyName, startTime, endTime, purpose } = req.body;

  const schedule = new Schedule({ labId, userId, date, class: className, facultyName, startTime, endTime, purpose });
  const savedSchedule = await schedule.save();

  res.status(201).json(savedSchedule);
});

// Update an existing schedule
export const updateSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedSchedule = await Schedule.findByIdAndUpdate(id, updates, { new: true });

  if (!updatedSchedule) {
    res.status(404).json({ message: "Schedule not found" });
    return;
  }

  res.json(updatedSchedule);
});

// Remove a schedule
export const removeSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const removedSchedule = await Schedule.findByIdAndDelete(id);

  if (!removedSchedule) {
    res.status(404).json({ message: "Schedule not found" });
    return;
  }

  res.json({ message: "Schedule removed successfully" });
});

// Get schedules for a lab with aggregation
export const getSchedulesForLab = asyncHandler(async (req, res) => {
  const { labId } = req.params;

  const today = new Date();
  const startDate = new Date(today.setDate(today.getDate() - 1)); // Include one old schedule
  const endDate = new Date(today.setDate(today.getDate() + 6)); // Next 6 days

  const schedules = await Schedule.aggregate([
    { $match: { labId: mongoose.Types.ObjectId(labId), date: { $gte: startDate, $lte: endDate } } },
    { $group: {
        _id: "$date",
        schedules: { $push: "$$ROOT" }
      }
    },
    { $sort: { _id: 1 } } // Sort by date
  ]);

  res.json(schedules);
});

// Export schedules as Excel
export const exportScheduleAsExcel = asyncHandler(async (req, res) => {
  const { labId } = req.params;

  const schedules = await Schedule.find({ labId }).sort({ date: 1 });
  const fields = ["labId", "userId", "date", "class", "facultyName", "startTime", "endTime", "purpose", "status"];
  const json2csvParser = new Parser({ fields });

  const csv = json2csvParser.parse(schedules);
  res.header("Content-Type", "text/csv");
  res.attachment("schedules.csv");
  res.send(csv);
});

// Export schedules as PDF
export const exportScheduleAsPDF = asyncHandler(async (req, res) => {
  const { labId } = req.params;

  const schedules = await Schedule.find({ labId }).sort({ date: 1 });
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=schedules.pdf");

  doc.pipe(res);
  doc.text("Lab Schedules", { align: "center" });
  doc.moveDown();

  schedules.forEach(schedule => {
    doc.text(`Date: ${schedule.date.toDateString()}`);
    doc.text(`Class: ${schedule.class}`);
    doc.text(`Faculty: ${schedule.facultyName}`);
    doc.text(`Start Time: ${schedule.startTime}`);
    doc.text(`End Time: ${schedule.endTime}`);
    doc.text(`Purpose: ${schedule.purpose}`);
    doc.text(`Status: ${schedule.status}`);
    doc.moveDown();
  });

  doc.end();
});
