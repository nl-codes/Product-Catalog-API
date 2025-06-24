import mongoose from "mongoose";
import { Category } from "../models/models.js";

export const createCategory = async ({ name, description = "" }) => {
    if (!name || name.trim() === "") {
        throw new Error("Catgory name is required");
    }

    const exisiting = await Category.findOne({
        name: new RegExp(`^${name.trim()}$`, "i"),
    });
    if (exisiting) {
        throw new Error("Category already exists");
    }

    const category = new Category({
        name: name.trim(),
        description: description.trim(),
    });

    return await category.save();
};

export const listAllCategory = async () => {
    return Category.find();
};

export const changeCategoryById = async (
    { id: existing_id },
    { name, description }
) => {
    if (!existing_id) {
        throw new Error("Category id is required");
    }

    if (!mongoose.Types.ObjectId.isValid(existing_id)) {
        throw new Error("Category id is invalid");
    }

    if (!name || name.trim() === "") {
        throw new Error("Category name is required");
    }

    if (!description || description.trim() === "") {
        throw new Error("Category description is required");
    }

    const exisitingCategory = await Category.findOne({
        _id: existing_id,
    });

    if (!exisitingCategory) {
        throw new Error("Category doesn't exist");
    }

    const filter = { _id: existing_id };
    const update = {
        name: name.trim().toLowerCase(),
        description: description.trim(),
    };

    return await Category.findOneAndUpdate(filter, update, { new: true });
};
