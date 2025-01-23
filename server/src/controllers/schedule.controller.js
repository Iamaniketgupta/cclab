import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Schedule from "../models/schedule.model.js";
 
// Create a new schedule
export const createNewSchedule = asyncHandler(async (req, res) => {
 
  const schedule = new Schedule({
    ...req.body,
    userId: req.user._id
  });
  if(!schedule){
    res.status(400);
    throw new Error("Something went wrong");
  }
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

 
export const getSchedules = asyncHandler(async (req, res) => {
  const today = new Date();
  const startDate = new Date(today.setDate(today.getDate() - 1)); // One old
  const endDate = new Date(today.setDate(today.getDate() + 6)); // Next 6 days
  
  const schedules = await Schedule.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate },
      },
    },
    { $sort: { date: 1 } },  
    {
      $unwind: "$details",  
    },
    {
      $lookup: {
        from: "labs",   
        localField: "details.labId",
        foreignField: "_id",
        as: "details.labInfo",
      },
    },
    {
      $unwind: "$details.labInfo",   
    },
    {
      $addFields: {
        
        dayLabel: {
          $switch: {
            branches: [
              { case: { $eq: [{ $dayOfYear: "$date" }, { $dayOfYear: new Date() }] }, then: "Today" },
              { case: { $eq: [{ $dayOfYear: "$date" }, { $dayOfYear: new Date(new Date().setDate(new Date().getDate() - 1)) }] }, then: "Yesterday" },
            ],
            default: "Upcoming",
          },
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        userId: { $first: "$userId" },
        date: { $first: "$date" },
        dayLabel: { $first: "$dayLabel" },
        details: { $push: "$details" },
        status: { $first: "$status" },
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
      },
    },
    { 
      $sort: { "dayLabel": 1, "date": 1 }   
    }
  ]);

  res.json(schedules);
});




 