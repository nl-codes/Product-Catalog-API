// Import service-level functions for handling category data operations
import { createProduct, listAllProducts } from "../services/productService.js";

/**
 * @function addProduct
 * @description
 * Express controller to handle the creation of a new product.
 * It receives product data from the request body, passes it to the `createProduct` service,
 * and returns the created product or an appropriate error response.
 *
 * - If the product is created successfully: responds with HTTP `201 Created`.
 * - If the product already exists: responds with HTTP `409 Conflict`.
 * - If the category ID is invalid or does not exist: responds with HTTP `404 Not Found`.
 * - For all other validation failures: responds with HTTP `400 Bad Request`.
 *
 * @route POST /api/products
 *
 */
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

/**
 * @function getAllProducts
 * @description Controller to retrieve all products from the database.
 *              Responds with a list of all available products in JSON format.
 *              Calls the service layer's `listAllProducts` function.
 * @route GET /api/products
 */
export const getAllProducts = async (req, res) => {
    try {
        const products = await listAllProducts();
        res.status(200).json(products);
    } catch (err) {
        console.error("❌ Error fetching products: ", err);
        res.status(500).json({ error: "Error fetching products" });
    }
};
