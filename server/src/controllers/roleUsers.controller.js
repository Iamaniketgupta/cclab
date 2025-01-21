import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

// get all faculties
export const getAllFaculties = asyncHandler(async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(401);
        throw new Error("You are not authorized");
    }
    const faculties = await User.find({ role: "faculty" });
    res.status(200).json(faculties);
});

// get all students
export const getAllStudents = asyncHandler(async (req, res) => {
    if(req.user.role === 'student' ){
        res.status(401);
        throw new Error("You are not authorized");
    }
    const students = await User.find({ role: "student" });
    res.status(200).json(students);
});

// get all admins
export const getAllAdmins = asyncHandler(async (req, res) => {
    const admins = await User.find({ role: "admin" });
    res.status(200).json(admins);
});