import asyncHandler from "express-async-handler";
import Lab from "../models/lab.model.js";
 
// Add a new lab
export const addNewLab = asyncHandler(async (req, res) => {

    if(req.user.role !== 'admin'){
        res.status(401);
        throw new Error("You are not authorized");
    }
    const { labName, labCode, block, floor, capacity } = req.body;

    const labExists = await Lab.findOne({ labCode });
    if (labExists) {
        res.status(400);
        throw new Error("Lab with this code already exists");
    } 

    const lab = await Lab.create({
        labName,
        labCode,
        block,
        floor,
        capacity
    });

    if (lab) {
        res.status(201).json({
            message: "Lab added successfully",
            lab,
        });
    } else {
        res.status(400);
        throw new Error("Invalid lab data");
    }
});

// Get all labs
export const getAllLabs = asyncHandler(async (req, res) => {
    const labs = await Lab.find({}) 
    res.status(200).json(labs);
});

// Get a single lab  
export const getSingleLab = asyncHandler(async (req, res) => {
    const lab = await Lab.findById(req.params.id).populate('resources');
    if (lab) {
        res.status(200).json(lab);
    } else {
        res.status(404);
        throw new Error("Lab not found");
    }
});

// Update a lab by ID
export const updateLab = asyncHandler(async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(401);
        throw new Error("You are not authorized");
    }
    const { labName, labCode, block, floor, resources, capacity, feedbackActive } = req.body;

    const lab = await Lab.findById(req.params.id);

    if (lab) {
        lab.labName = labName || lab.labName;
        lab.labCode = labCode || lab.labCode;
        lab.block = block || lab.block;
        lab.floor = floor || lab.floor;
        lab.resources = resources || lab.resources;
        lab.capacity = capacity || lab.capacity;
        lab.feedbackActive = feedbackActive !== undefined ? feedbackActive : lab.feedbackActive;

        const updatedLab = await lab.save();

        res.status(200).json({
            message: "Lab updated successfully",
            lab: updatedLab,
        });

    } else {
        res.status(404);
        throw new Error("Lab not found");
    }
});

// Delete a lab 
export const deleteLab = asyncHandler(async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(401);
        throw new Error("You are not authorized");
    }
    const lab = await Lab.findById(req.params.id);

    if (lab) {
        if (lab.resources && lab.resources.length > 0) {
            await Resource.deleteMany({ _id: { $in: lab.resources } });
        }

        await lab.deleteOne();

        res.status(200).json({ message: "Lab and related resources deleted successfully" });
    } else {
        res.status(404);
        throw new Error("Lab not found");
    }
});