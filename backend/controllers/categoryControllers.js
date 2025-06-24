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

export const addCategory = async (req, res) => {
    try {
        const { name, description = "" } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "Catgory name is required" });
        }

        const exisiting = await Category.findOne({
            name: new RegExp(`^${name}$`, "i"),
        });
        if (exisiting) {
            return res.status(409).json({ error: "Category already exists" });
        }

        const category = new Category({
            name: name.trim(),
            description: description.trim(),
        });

        const savedCategory = await category.save();

        res.status(201).json(savedCategory);
    } catch (err) {
        console.error("error adding category: ", err);
        return res.status(500).json({ error: "Error adding category" });
    }
};
