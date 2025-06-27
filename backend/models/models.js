import mongoose, { model, Schema } from "mongoose";

// Category Schema
const categorySchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, default: "" },
    },
    { timestamps: true }
);

// Product Schema
const productSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, default: "" },
        price: { type: Number, required: true, min: 0 },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        stock: { type: Number, default: 0, min: 0 },
    },
    { timestamps: true }
);

// Users Schema
const userSchema = new Schema({
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: "admin" | "user",
});

// Export Category and Product Models
export const Category = model("Category", categorySchema);
export const Product = model("Product", productSchema);
export const User = model("User", userSchema);
