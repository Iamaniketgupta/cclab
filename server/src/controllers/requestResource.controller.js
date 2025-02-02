import asyncHandler from "express-async-handler";
import Request from "../models/requests.model.js";
import sendEmail from "../service/sendMail.js";
import Lab from "../models/lab.model.js";

// Raise a new resource request
export const raiseNewRequest = asyncHandler(async (req, res) => {
    const { labId, resourceType, requestDesc } = req.body;

    if (!labId || !resourceType || !requestDesc) {
        res.status(400);
        throw new Error("All fields are required");
    }
    
    const labdetails = await Lab.findById(labId);

    if (!labdetails) {
        res.status(404).json({ message: "Invalid Lab Id" });
    }

    const newRequest = await Request.create({
        labId,
        resourceType,
        requestedBy: req.user._id,
        requestDesc,
    });

    // find the admin of the lab block 
    const admin = await User.findOne({ role: "admin" , block: labdetails.block });



    if (newRequest) {

        // await sendEmail({
        //     to: req.user.email,
        //     subject: `Request for ${resourceType} raised successfully`,
        //     text: `Your request for ${resourceType} has been raised successfully.`
        // });

        if(admin){
        await sendEmail({
            to: admin.email,
            subject: `${req.user.name} raised a request for ${resourceType}`,
            text: `${req.user.name} raised a request for ${resourceType}. Kindly, review the request.`,
        });
    }

        res.status(201).json({
            message: "Request raised successfully",
            request: newRequest,
        });
    } else {
        res.status(400);
        throw new Error("Failed to raise request");
    }
});

// Get all resource requests
export const getAllRequests = asyncHandler(async (req, res) => {

    const requests = await Request.find({})
        .populate("labId", "labName labCode block")
        .populate("requestedBy", "name email rollNumber")
        .sort({ createdAt: -1 });

    res.status(200).json(requests);
});

// Get all resource requests by user
export const getAllRequestsByUserId = asyncHandler(async (req, res) => {

    const requests = await Request.find({ requestedBy: req.user._id })
        .populate("labId", "labName labCode block")
        .sort({ createdAt: -1 });

     res.status(200).json(requests);
});

// Get a single resource request by ID
export const getSingleRequest = asyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id).populate(
        "requestedBy",
        "name email rollNumber"
    );

    if (request) {
        res.status(200).json(request);
    } else {
        res.status(404);
        throw new Error("Request not found");
    }
});

// Update the status of a request
export const updateRequestStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    if(req.user.role!=="admin")
    {
        return res.status(401).json({message:"You are not Authorized"});
    }

    const validStatuses = ["pending", "approved", "rejected"];
    if (!validStatuses.includes(status)) {
        res.status(400);
        throw new Error("Invalid status value");
    }

    const request = await Request.findById(req.params.id).populate(
        "requestedBy",
        "name email rollNumber"
    );

    if (request) {
        request.status = status;
        const updatedRequest = await request.save();

if(request.requestedBy.email){
        await sendEmail({
            to: request.requestedBy.email,
            subject: `Your request for ${request.resourceType} has been ${status}`,
            text: `Your request for ${request.resourceType} has been ${status}.`,
        });
    }


        res.status(200).json({
            message: "Request status updated successfully",
            request: updatedRequest,
        });
    } else {
        res.status(404);
        throw new Error("Request not found");
    }
});


//  Delete a resource request
export const deleteRequest = asyncHandler(async (req, res) => {
    const request = await Request.findByIdAndDelete(req.params.id);

    if (request) {
        res.status(200).json({
            message: "Request deleted successfully",
        });
    } else {
        res.status(404);
        throw new Error("Request not found");
    }
});