import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }, {
        timestamps: true
    }
)

export const projectModel = mongoose.model('Project', schema)