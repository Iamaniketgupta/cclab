// For resources like computers, projectors, peripherals and software

import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
    labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab', required: true },

    resourceType: {
        type: String,
        enum: ['computer', 'software'],
        required: true
    },
 
 
     code: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        sparse: true
     },

     status: {
        type: String,
        enum: ['available', 'in-use', 'under-maintenance', 'damaged', 'reserved'],
        default: 'available',
        required: true
    },

    // optional
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // Hardware specific details
    brand: { type: String },
    processor: { type: String },
    ram: { type: String },
    hardDisk: { type: String },
   

    // Software specific details
    softwareName: { type: String },
    version: { type: String },
     softwareStatus: {
        type: String,
        enum: ['active', 'expired'],
        default: 'active'
    },
 

 

}, { timestamps: true });

const Resource = mongoose.model('Resource', ResourceSchema);

export default Resource