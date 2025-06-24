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
