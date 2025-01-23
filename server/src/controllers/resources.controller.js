import asyncHandler from "express-async-handler";
import Resource from "../models/resource.model.js";
import Lab from "../models/lab.model.js";

// Add a new lab resource
export const addNewLabResource = asyncHandler(async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(401);
        throw new Error("You are not authorized");
    }
    const { labId, resourceType, resourceName, code,
        status, brand, model, serialNumber, purchaseDate,
        licenseKey, version, expiryDate, softwareStatus,
        resolution, screenType, peripheralType, assignedTo, resourceId } = req.body;

        console.log(req.body);
    if (!labId || !resourceType || !resourceName || !code) {
        res.status(400);
        throw new Error("labId, resourceType, resourceName, and code are required");
    }

    const newResource = await Resource.create({
        labId,
        resourceType,
        resourceName,
        code,
        status,
        brand,
        model,
        serialNumber,
        purchaseDate,
        licenseKey,
        version,
        expiryDate,
        softwareStatus,
        resolution,
        screenType,
        peripheralType,
        assignedTo,
        resourceId
    });

    // Assign the new resource to the lab
    const lab = await Lab.findById(labId);
    if (lab) {
        lab.resources.push(newResource._id);
        await lab.save();
    }
    

    if (newResource) {
        res.status(201).json({
            message: "Resource added successfully",
            resource: newResource
        });
    } else {
        res.status(400);
        throw new Error("Failed to add resource");
    }
});

// Update a lab resource
export const updateLabResource = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);

    if (resource) {
        Object.assign(resource, req.body);
        const updatedResource = await resource.save();

        res.status(200).json({
            message: "Resource updated successfully",
            resource: updatedResource
        });
    } else {
        res.status(404);
        throw new Error("Resource not found");
    }
});

// Delete a lab resource
export const deleteLabResource = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);

    if (resource) {
        await resource.deleteOne();
        res.status(200).json({ message: "Resource deleted successfully" });
    } else {
        res.status(404);
        throw new Error("Resource not found");
    }
});

// Get all resources by labId
export const getAllResources = asyncHandler(async (req, res) => {
  
    const resources = await Resource.find({}).sort({ createdAt: -1 });

    if (resources.length > 0) {
        res.status(200).json(resources);
    } else {
        res.status(404);
        throw new Error("No resources found for this lab");
    }
});

// Get a single resource by ID
export const getSingleResourceById = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);

    if (resource) {
        res.status(200).json(resource);
    } else {
        res.status(404);
        throw new Error("Resource not found");
    }
});

