import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/product_catalog");
        console.log("✅ MongoDB connected.");
    } catch (error) {
        console.log("❌ DB connection error ", error);
        process.exit(1);
    }
};

export default connectDB;
