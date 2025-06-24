import mongoose from "mongoose";
import { Product } from "../models/models.js";
import { findCategoryById } from "./categoryService.js";

export const createProduct = async ({
    name,
    description = "",
    price,
    stock = 0,
    category,
}) => {
    if (!name || name.trim() === "") {
        throw new Error("Product name is missing");
    }

    const exisiting = await Product.findOne({
        name: new RegExp(`^${name.trim().toLowerCase()}$`, "i"),
    });
    if (exisiting) {
        throw new Error("Product already exists");
    }

    if (price == null || isNaN(price)) {
        throw new Error("Product price is invalid");
    }

    if (isNaN(stock)) {
        throw new Error("Product stock is invalid");
    }

    if (!category) {
        throw new Error("Product category is missing");
    } else if (!mongoose.Types.ObjectId.isValid(category)) {
        throw new Error("Category Id is invalid");
    }

    const categoryExists = await findCategoryById({ id: category });
    if (!categoryExists) {
        throw new Error("Category Id doesn't exist");
    }

    const product = new Product({
        name: name.trim().toLowerCase(),
        description: description.trim(),
        price: price,
        stock: stock,
        category: category,
    });
    return await product.save();
};
