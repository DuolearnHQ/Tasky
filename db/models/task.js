import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true,
            default: Date.now
        },
        endDate: {
            type: Date,
            required: true,
        },
        priority: {
            type: String,
            enum : ["low", "medium", "high"],
            required: true,
        },
        project: {
            type: mongoose.Types.ObjectId,
            ref: 'Project',
            required: true
        }
    }, {
        timestamps: true
    }
)

export const taskModel = mongoose.model('Task', schema)