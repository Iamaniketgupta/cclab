// This Schema handles the Issues Tickets Raised by Students
import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
    resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
        required: true
    },
    labId :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    issueType: {
        type: String,
        required: true,
        enum : ['hardware', 'software', 'other']
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issueDesc: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['reported', 'in-progress', 'resolved'],
        default: 'reported'
    },
    reportedAt: {
        type: Date,
        default: Date.now
    },
    resolvedAt: { type: Date }
});

const Issue = mongoose.model('Issue', IssueSchema);

export default Issue