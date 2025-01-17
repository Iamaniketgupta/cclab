import mongoose from "mongoose";

const LabSchema = new mongoose.Schema({
    labName: { type: String, trim: true, required: true },
    labCode: { type: String, trim: true,  lowercase: true, required: true },
    block: { type: String, trim: true, uppercase: true, required: true },
    floor: { type: Number, required: true },
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
    capacity: { type: Number, required: true }

}, { timestamps: true });

const Lab = mongoose.model('Lab', LabSchema);

export default Lab;