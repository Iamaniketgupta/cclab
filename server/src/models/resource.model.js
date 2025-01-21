// For resources like computers, projectors, peripherals and software

import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
    labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab', required: true },

    resourceType: {
        type: String,
        enum: ['computer', 'projector', 'peripheral', 'software'],
        required: true
    },

    resourceId: { // e.g. computer resource id if we are adding mouse,software or keyboard etc associated with computer
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
    },

    // valid resource name
    resourceName: {
        type: String,
        required: true,
        trim: true
    },

    // a unique and structured code for the resource is expected
    code: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
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
    model: { type: String },
    serialNumber: { type: String },
    purchaseDate: { type: Date },

    // Software specific details
    licenseKey: { type: String, unique: true },
    version: { type: String },
    expiryDate: { type: Date },
    softwareStatus: {
        type: String,
        enum: ['active', 'expired'],
        default: 'active'
    },
 

 

}, { timestamps: true });

const Resource = mongoose.model('Resource', ResourceSchema);

export default Resource