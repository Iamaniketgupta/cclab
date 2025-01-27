import asyncHandler from "express-async-handler";
  import dayjs from "dayjs";
import Schedule from "../models/schedule.model.js";
import Lab from "../models/lab.model.js"
import mongoose from "mongoose";

export const dashboardStats = asyncHandler(async (req, res) => {
  try {
    const currentDate = dayjs().startOf("day").toDate();
    const currentTime = dayjs().format("HH:mm");

    const busyLabsData = await Schedule.aggregate([
      { $match: { date: currentDate, status: "scheduled" } },  
      { $unwind: "$details" },  
      {
        $addFields: {
          startTime: { $dateToString: { format: "%H:%M", date: "$details.startTime" } },
          endTime: { $dateToString: { format: "%H:%M", date: "$details.endTime" } },
        },
      },
      {
        $match: {
          $expr: {
            $and: [
              { $lte: ["$startTime", currentTime] },
              { $gte: ["$endTime", currentTime] },
            ],
          },
        },
      },
      {
        $project: {
          labId: "$details.labId",
          class: "$details.class",
          facultyName: "$details.facultyName",
          startTime: "$startTime",
          endTime: "$endTime",
          purpose: "$details.purpose",
          status: { $literal: "busy" },
        },
      },
    ]);

    const allLabs = await Lab.find({}, { _id: 1, labName: 1, labCode: 1 });

    const busyLabsMap = new Map(busyLabsData.map((lab) => [lab.labId.toString(), lab]));

    const result = {
      busyLabs: busyLabsData.map((lab) => ({
        labId: lab.labId,
        labCode: lab.labId.labCode,
        labName: lab.labId.labName  ,
        class: lab.class,
        facultyName: lab.facultyName,
        startTime: lab.startTime,
        endTime: lab.endTime,
        purpose: lab.purpose,
        status: lab.status,
      })),
      availableLabs: allLabs
        .filter((lab) => !busyLabsMap.has(lab._id.toString()))
        .map((lab) => ({
          labId: lab._id,
          labName: lab.labName,
          labCode: lab.labCode,
          status: "available",
        })),
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});



// get monthly average stat
export const getDailyAvgUsage = asyncHandler(async (req, res) => {
    try {
        const { labId } = req.params;
        const currentYear = dayjs().year();

        let matchCondition = {
            status: "scheduled",
            date: { $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`) },
        };

        if (labId && labId !== "") {
            matchCondition["details.labId"] = new mongoose.Types.ObjectId(labId);
        }

        const result = await Schedule.aggregate([
            { $unwind: "$details" },
            { $match: matchCondition },
            {
                $addFields: {
                    yearMonth: { $dateToString: { format: "%Y-%m", date: "$date" } },
                    usageDuration: { $subtract: ["$details.endTime", "$details.startTime"] },
                },
            },
            {
                $group: {
                    _id: "$yearMonth",
                    totalUsage: { $sum: "$usageDuration" },
                    usageCount: { $sum: 1 },
                },
            },
            {
                $project: {
                    month: "$_id",
                    avgUsage: { $divide: ["$totalUsage", "$usageCount"] },
                    _id: 0,
                },
            },
            {
                $sort: { month: 1 },
            },
        ]);

        // Prepare the months array
        const allMonths = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        // Create an array to hold the result, ensuring each month is represented
        let filledResult = allMonths.map((month, index) => {
            // Check if data for the month is available
            const monthData = result.find(entry => parseInt(entry.month.split("-")[1]) - 1 === index);

            // If no data for this month, set avgUsage to 0
            return {
                month: month,
                avgUsage: monthData ? monthData.avgUsage : 0,
            };
        });

        res.status(200).json(filledResult);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});





