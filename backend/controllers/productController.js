// Import service-level functions for handling category data operations

import { createProduct } from "../services/productService.js";

export const addProduct = async (req, res) => {
    try {
        const savedProduct = await createProduct(req.body);
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error("❌ Product creation error:", err.message);

        let status = 400;
        if (err.message === "Product already exists") status = 409;
        else if (
            err.message === "Category Id doesn't exist" ||
            err.message === "Category Id is invalid"
        )
            status = 404;

        return res.status(status).json({ error: err.message });
    }
};
