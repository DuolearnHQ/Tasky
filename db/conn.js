import mongoose from "mongoose"

export const connectToDB = async () => {
    if (!process.env.MONGO_URI) throw new Error("Missing MONGO_URI environment variable")
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(process.env.MONGO_URI);
}
