import { Category } from "../models/models.js";
import { createCategory } from "../services/categoryService.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        console.error("Error fetching categories: ", err);
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
