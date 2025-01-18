import asyncHandler from "express-async-handler";
import Resource from "../models/Resource.js";

// Add a new lab resource
export const addNewLabResource = asyncHandler(async (req, res) => {
    const { labId, resourceType, resourceName, code,
        status, brand, model, serialNumber, purchaseDate,
        licenseKey, version, expiryDate, softwareStatus,
        resolution, screenType, peripheralType, assignedTo, resourceId } = req.body;

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
export const getAllResourcesByLabId = asyncHandler(async (req, res) => {
    const { labId } = req.params;

    const resources = await Resource.find({ labId }).sort({ createdAt: -1 });

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
