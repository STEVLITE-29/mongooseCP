import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to MongoDB")
    } catch (error) {
        console.error("Failed to connect to MongoDB", error)
    }
}

connectdb()