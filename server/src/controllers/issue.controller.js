import asyncHandler from "express-async-handler";
import Issue from "../models/issue.model.js";
import sendEmail from "../service/sendMail.js";
import User from "../models/user.model.js";
import Lab from "../models/lab.model.js";


// Raise a new issue
export const raiseIssue = asyncHandler(async (req, res) => {
    const { resourceId, labId, issueType, issueDesc } = req.body;

    if (!resourceId || !labId || !issueType || !issueDesc) {
        res.status(400).json({ message: "All fields are required." });
        return;
    }
    const labdetails = await Lab.findById(labId);

    if (!labdetails) {
        return res.status(404).json({ message: "Lab not found." });
     
    }
    const admin = await User.findOne({ role: "admin" , block: labdetails.block });

    const issue = await Issue.create({
        resourceId,
        labId,
        issueType,
        issueDesc,
        reportedBy: req.user._id,
    });

//    console.log(admin.email)
    if(admin){
    await sendEmail({
        to: admin.email,
        subject: `New issue raised by ${req.user.name}`,
        text:  `New issue raised by ${req.user.name}. Issue details: ${issueDesc}`,
    })
}

    res.status(201).json({ message: "Issue raised successfully.", issue });
});

// Update issue status
export const updateIssueStatus = asyncHandler(async (req, res) => {
    const { issueId } = req.params;
    const { status } = req.body;

    if (!["reported", "in-progress", "resolved"].includes(status)) {
        res.status(400).json({ message: "Invalid status." });
        return;
    }

    const issue = await Issue.findById(issueId).populate("reportedBy" , "name email rollNumber");

    if (!issue) {
        res.status(404).json({ message: "Issue not found." });
        return;
    }

    issue.status = status;

    if (status === "resolved") {
        issue.resolvedAt = Date.now();
    } else {
        issue.resolvedAt = undefined;
    }

    await issue.save();
   
    if(issue.reportedBy.email){
    await sendEmail({
        to: issue.reportedBy.email,
        subject: `CampusFlow Pcte : Your raised issue has been ${status}`,
        text: `Your issue has been ${status}. Issue details: ${issue.issueDesc}`,
    })
    }

    res.status(200).json({ message: "Issue status updated successfully.", issue });
});

// Get all issues by lab ID
export const getAllIssues = asyncHandler(async (req, res) => {

    const issues = await Issue.find({})
        .populate("labId", "labName labCode block")
        .populate("reportedBy", "name email rollNumber");

    res.status(200).json(issues);
});
export const getAllMyIssues = asyncHandler(async (req, res) => {

    const issues = await Issue.find({ reportedBy: req.user._id })
        .populate("labId", "labName labCode")

    res.status(200).json(issues);
});

// Get a single issue
export const getSingleIssue = asyncHandler(async (req, res) => {
    const { issueId } = req.params;

    const issue = await Issue.findById(issueId)
        .populate("resourceId", "name")
        .populate("reportedBy", "name email rollNumber");

    if (!issue) {
        res.status(404).json({ message: "Issue not found." });
        return;
    }

    res.status(200).json({ message: "Issue fetched successfully.", issue });
});
