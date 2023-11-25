import mongoose from "mongoose"

export const connectToDB = async () => {
    return mongoose.connect(process.env.MONGO_URI);
}