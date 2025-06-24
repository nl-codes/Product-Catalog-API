import { Category } from "../models/models.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        console.error("Error fetching categories: ", err);
        res.status(500).json({ error: "Error fetching categories" });
    }
};
