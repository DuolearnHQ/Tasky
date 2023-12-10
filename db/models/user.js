import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
        }
    }, {
        timestamps: true
    }
)

export const userModel = mongoose.model('User', schema)
