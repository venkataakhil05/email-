import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ Success: MongoDB Connected to ${process.env.MONGO_URI}`);
        process.exit(0);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();
