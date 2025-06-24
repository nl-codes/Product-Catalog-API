import {
    changeCategoryById,
    createCategory,
    listAllCategory,
} from "../services/categoryService.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await listAllCategory();
        res.status(200).json(categories);
    } catch (err) {
        console.error("❌ Error fetching categories: ", err);
        res.status(500).json({ error: "Error fetching categories" });
    }
};

export const addCategory = async (req, res) => {
    try {
        const savedCategory = await createCategory(req.body);
        res.status(201).json(savedCategory);
    } catch (err) {
        console.error("❌ Error:", err.message);
        const status = err.message === "Category already exists" ? 409 : 400;
        return res.status(status).json({ error: err.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const editedCategory = await changeCategoryById(req.params, req.body);
        res.status(200).json(editedCategory);
    } catch (err) {
        console.error("❌ Error:", err.message);
        const status = err.message === "Category doesn't exist" ? 404 : 400;
        return res.status(status).json({ error: err.message });
    }
};
