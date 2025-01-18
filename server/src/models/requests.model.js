// This schema handles the Resource Requests
import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({

    labId :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },

    resourceType: {
        type: String,
        enum: ['computer', 'projector', 'peripheral', 'software'],
        required: true
    },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    requestDesc: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
     
},{timestamps: true});

const Request = mongoose.model('Request', RequestSchema);

export default Request