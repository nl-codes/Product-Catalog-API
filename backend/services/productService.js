import mongoose from "mongoose";
import { Product } from "../models/models.js";
import { findCategoryById } from "./categoryService.js";

/**
 * @function createProduct
 * @description
 * Service function to validate and create a new product entry in the database.
 * Performs input validation, checks for name uniqueness, validates referenced category,
 * and ensures proper numeric types before saving the product document.
 *
 * @param {Object} productData - The input data required to create a product.
 * @param {string} productData.name - The name of the product (required, non-empty).
 * @param {string} [productData.description=""] - Optional description of the product.
 * @param {number} productData.price - The price of the product (required, must be numeric).
 * @param {number} [productData.stock=0] - Quantity in stock (defaults to 0, must be numeric).
 * @param {string} productData.category - The `_id` of the associated category (required, must be valid and exist).
 *
 * @throws {Error} If:
 * - `name` is missing or empty
 * - `name` already exists (case-insensitive match)
 * - `price` is missing or not a number
 * - `stock` is not a number
 * - `category` is missing, invalid, or does not exist in the database
 *
 * @returns {Promise<Object>} The saved product document with populated fields.
 *
 */
export const createProduct = async ({
    name,
    description = "",
    price,
    stock = 0,
    category,
}) => {
    if (!name || name.trim() === "") {
        throw new Error("Product name is missing");
    }

    const exisiting = await Product.findOne({
        name: new RegExp(`^${name.trim().toLowerCase()}$`, "i"),
    });
    if (exisiting) {
        throw new Error("Product already exists");
    }

    if (price == null || isNaN(price)) {
        throw new Error("Product price is invalid");
    }

    if (isNaN(stock)) {
        throw new Error("Product stock is invalid");
    }

    if (!category) {
        throw new Error("Product category is missing");
    } else if (!mongoose.Types.ObjectId.isValid(category)) {
        throw new Error("Category Id is invalid");
    }

    const categoryExists = await findCategoryById({ id: category });
    if (!categoryExists) {
        throw new Error("Category Id doesn't exist");
    }

    const product = new Product({
        name: name.trim().toLowerCase(),
        description: description.trim(),
        price: price,
        stock: stock,
        category: category,
    });
    return await product.save();
};

/**
 * @function listAllProducts
 * @description Service function to retrieve all product documents from the database.
 *
 * @returns {Promise<Array>} Array of product documents.
 */
export const listAllProducts = async () => {
    return Product.find();
};

/**
 * @function findProductById
 * @description
 * Service function to retrieve a single product document by its ObjectId.
 * Performs validation on the provided ID before querying the database.
 * Returns the product document if found, or `null` if not found.
 *
 * @param {Object} param - Object containing the product ID.
 * @param {string} param.id - The `_id` of the product to be retrieved.
 *
 * @throws {Error} If the `id` is missing or not a valid MongoDB ObjectId.
 *
 * @returns {Promise<Object|null>} The product document if found, or `null` if it doesn't exist.
 *
 */
export const findProductById = async ({ id }) => {
    if (!id) {
        throw new Error("Product id is required");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Product id is invalid");
    }

    const exisitingProduct = await Product.findOne({
        _id: id,
    });

    return exisitingProduct;
};
