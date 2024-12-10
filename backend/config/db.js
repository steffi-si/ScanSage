import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected to database...");
    } catch (err) {
        console.error(`Error while connecting to database: ${err.message}`);
    }
}

export default connectDB;