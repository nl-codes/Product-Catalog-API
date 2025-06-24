import mongoose from "mongoose";
import { Product } from "../models/models.js";

export const addProduct = async ({
    name,
    description = "",
    price,
    stock = 0,
    category,
}) => {
    try {
        if (!name || name.trim() === "") {
            throw new Error("Product name is missing");
        }

        if (!price) {
            throw new Error("Product price is missing");
        } else if (!mongoose.Types.Number.isValid(price)) {
            throw new Error("Product price is invalid");
        }

        if (!category) {
            throw new Error("Product category is missing");
        } else if (!mongoose.Types.ObjectId.isValid(category)) {
            throw new Error("Category Id is invalid");
        }
    } catch (error) {}
};
