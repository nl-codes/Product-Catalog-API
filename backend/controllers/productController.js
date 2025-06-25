// Import service-level functions for handling category data operations
import {
    changeProductById,
    createProduct,
    findProductById,
    listAllProducts,
    removeProductById,
    selectProductByCategoryId,
} from "../services/productService.js";

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

/**
 * @function getProductById
 * @description Controller to retrieve product from the database based on given product id.
 *              Responds with a details of the product found in JSON format.
 *              Calls the service layer's `findProductById` function.
 * @route GET /api/products/:id
 */
export const getProductById = async (req, res) => {
    try {
        const searchedProduct = await findProductById(req.params);
        if (!searchedProduct) {
            return res.status(404).json({ error: "Product id not found" });
        }
        return res.status(200).json(searchedProduct);
    } catch (err) {
        console.error("❌ Error:", err.message);
        const status = err.message === "Product id is required" ? 404 : 400;
        return res.status(status).json({ error: err.message });
    }
};

/**
 * @function updateProductById
 * @description Controller to update an existing product by its ID.
 *              Expects `id` in the request parameters and updated data in the request body.
 *              Delegates the update operation to `changeProductById`.
 *              Returns the updated product or an appropriate error if not found.
 *
 * @route PUT /api/products/:id
 *
 */
export const updateProductById = async (req, res) => {
    try {
        const editedProduct = await changeProductById(req.params, req.body);
        res.status(200).json(editedProduct);
    } catch (err) {
        console.error("❌ Error:", err.message);

        let status = 400;
        if (
            err.message === "Product Id doesn't exist" ||
            err.message === "Category Id doesn't exist"
        ) {
            status = 404;
        } else if (err.message === "Product Name already exists") {
            status = 409;
        } else if (
            [
                "Product Id is missing",
                "Product Id is invalid",
                "Product Name is missing",
                "Product Description is missing",
                "Product price is invalid",
                "Product stock is invalid",
                "Product category is missing",
                "Category Id is invalid",
            ].includes(err.message)
        ) {
            status = 422;
        }
        return res.status(status).json({ error: err.message });
    }
};

/**
 * @function deleteProductById
 * @description Controller to delete a product by its ID.
 *              Expects `id` in the request parameters and delegates deletion to `removeProductById`.
 *              Responds with a success message or an error if the product doesn't exist.
 * @route DELETE /api/product/:id
 */
export const deleteProductById = async (req, res) => {
    try {
        await removeProductById(req.params);
        return res.status(200).json({
            message: `Product of id ${req.params.id} has been deleted.`,
        });
    } catch (err) {
        console.error("❌ Error:", err.message);
        const status = err.message === "Product doesn't exist" ? 404 : 400;
        return res.status(status).json({ error: err.message });
    }
};

export const filterProductByCategoryId = async (req, res) => {
    try {
        const filteredProducts = await selectProductByCategoryId(req.params);
        return res.status(200).json(filteredProducts);
    } catch (err) {
        console.error("❌ Error:", err.message);
        const status = err.message === "Category Id doesn't exist" ? 404 : 400;
        return res.status(status).json({ error: err.message });
    }
};
