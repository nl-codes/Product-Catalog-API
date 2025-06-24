import mongoose from "mongoose";
import { Category } from "../models/models.js";

/**
 * @function createCategory
 * @description Service function to create a new category.
 *              Checks for name validity and uniqueness before creating the document.
 *              Converts name to lowercase for consistency.
 *
 * @param {Object} categoryData - An object containing `name` and optional `description`.
 * @param {string} categoryData.name - Name of the category to create.
 * @param {string} [categoryData.description=""] - Optional category description.
 *
 * @throws {Error} If `name` is missing or if a category with the same name already exists.
 * @returns {Promise<Object>} The saved category document.
 */
export const createCategory = async ({ name, description = "" }) => {
    if (!name || name.trim() === "") {
        throw new Error("Catgory name is required");
    }

    const exisiting = await Category.findOne({
        name: new RegExp(`^${name.trim().toLowerCase()}$`, "i"),
    });
    if (exisiting) {
        throw new Error("Category already exists");
    }

    const category = new Category({
        name: name.trim().toLowerCase(),
        description: description.trim(),
    });

    return await category.save();
};

/**
 * @function listAllCategory
 * @description Service function to retrieve all category documents from the database.
 *
 * @returns {Promise<Array>} Array of category documents.
 */
export const listAllCategory = async () => {
    return Category.find();
};

/**
 * @function changeCategoryById
 * @description Service function to update an existing category using its ID.
 *              Validates input and ensures the category exists before updating.
 *
 * @param {Object} param0 - Request parameter object.
 * @param {string} param0.id - The ID of the category to be updated.
 * @param {Object} param1 - Request body containing updated fields.
 * @param {string} param1.name - New name for the category.
 * @param {string} param1.description - New description for the category.
 *
 * @throws {Error} If the ID is missing, invalid, or the category doesn't exist.
 * @throws {Error} If name or description is missing or empty.
 * @returns {Promise<Object>} The updated category document.
 */
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

/**
 * @function removeCategoryById
 * @description Service function to delete a category by its ID.
 *              Validates ID and ensures the category exists before deletion.
 *
 * @param {Object} param0 - Request parameter object.
 * @param {string} param0.id - The ID of the category to be deleted.
 *
 * @throws {Error} If the ID is missing, invalid, or the category doesn't exist.
 * @returns {Promise<Object>} The deleted category document.
 */
export const removeCategoryById = async ({ id: existing_id }) => {
    if (!existing_id) {
        throw new Error("Category id is required");
    }

    if (!mongoose.Types.ObjectId.isValid(existing_id)) {
        throw new Error("Category id is invalid");
    }

    const exisitingCategory = await Category.findOne({
        _id: existing_id,
    });

    if (!exisitingCategory) {
        throw new Error("Category doesn't exist");
    }

    return await Category.findOneAndDelete({ _id: existing_id });
};
