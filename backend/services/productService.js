import mongoose from "mongoose";
import { Product } from "../models/models.js";
import { findCategoryById, findCategoryByName } from "./categoryService.js";

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
    return Product.find().populate("category", "_id name description");
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
    }).populate("category", "_id name description");

    return exisitingProduct;
};

/**
 * @function changeProductById
 * @description
 * Service function to update an existing product's details in the database.
 * Validates input fields including ID format, name uniqueness, value types, and category existence
 * before performing the update operation.
 *
 * @param {Object} params - Parameters from the route.
 * @param {string} params.id - The `_id` of the product to be updated.
 * @param {Object} updates - Updated product data.
 * @param {string} updates.name - New name of the product (required, unique, non-empty).
 * @param {string} updates.description - New description of the product (required).
 * @param {number} updates.price - Updated price (required, numeric, >= 0).
 * @param {number} updates.stock - Updated stock quantity (required, integer, >= 0).
 * @param {string} updates.category - Updated category `_id` (required, must be valid and exist).
 *
 * @throws {Error} If:
 * - `id` is missing or invalid
 * - Product with the given `id` does not exist
 * - `name` is missing, empty, or already taken by another product
 * - `description` is missing
 * - `price` is missing, invalid, or negative
 * - `stock` is missing, invalid, non-integer, or negative
 * - `category` is missing, invalid, or does not exist
 *
 * @returns {Promise<Object>} The updated product document with the new values.
 *
 */
export const changeProductById = async (
    { id },
    { name, description, price, stock, category }
) => {
    if (!id) {
        throw new Error("Product Id is missing");
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Product Id is invalid");
    }

    const existingProduct = await findProductById({ id });
    if (!existingProduct) {
        throw new Error("Product Id doesn't exist");
    }

    if (!name || name.trim() === "") {
        throw new Error("Product Name is missing");
    }

    const exisiting = await Product.findOne({
        name: new RegExp(`^${name.trim().toLowerCase()}$`, "i"),
    });
    if (exisiting) {
        throw new Error("Product Name already exists");
    }

    if (!description) {
        throw new Error("Product Description is missing");
    }

    if (price == null || isNaN(price) || price < 0) {
        throw new Error("Product price is invalid");
    }

    if (
        stock == null ||
        isNaN(stock) ||
        !Number.isInteger(stock) ||
        stock < 0
    ) {
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

    const update = {
        _id: id,
        name: name.trim().toLowerCase(),
        description: description.trim(),
        price: price,
        stock: stock,
        category: category,
    };

    return await Product.findOneAndUpdate({ _id: id }, update, { new: true });
};

/**
 * @function removeProductById
 * @description Service function to delete a product by its ID.
 *              Validates ID and ensures the product exists before deletion.
 *
 * @param {Object} param0 - Request parameter object.
 * @param {string} param0.id - The ID of the product to be deleted.
 *
 * @throws {Error} If the ID is missing, invalid, or the product doesn't exist.
 * @returns {Promise<Object>} The deleted product document.
 */
export const removeProductById = async ({ id }) => {
    if (!id) {
        throw new Error("Product Id is missing");
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Product Id is invalid");
    }

    const existingProduct = await findProductById({ id });
    if (!existingProduct) {
        throw new Error("Product Id doesn't exist");
    }

    return await Product.findOneAndDelete({ _id: id });
};

/**
 * @function selectProductByCategoryId
 * @description Service function retrieve all products that belong
 *              to a given category by its category Id
 *
 * @param {Object} params - The parameter object.
 * @param {string} params.id - The ObjectId of the category.
 *
 * @throws Will throw an error if:
 * - The category ID is missing.
 * - The category ID is invalid.
 * - No category exists with the given ID.
 *
 * @returns {Promise<Array>} A list of products with the given category ID,
 * each populated with `_id`, `name`, and `description` fields of the category.
 */
export const selectProductByCategoryId = async ({ id }) => {
    if (!id) {
        throw new Error("Category Id is missing");
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Category Id is invalid");
    }

    const categoryExists = await findCategoryById({ id });
    if (!categoryExists) {
        throw new Error("Category Id doesn't exist");
    }

    return await Product.find({ category: id }).populate(
        "category",
        "_id name description"
    );
};

/**
 * @function selectProductByCategoryName
 * @description Service function retrieve all products that belong
 *              to a given category by its category name
 *
 *
 * @param {Object} params - The parameter object.
 * @param {string} params.name - The name of the category (case-insensitive).
 *
 * @throws Will throw an error if:
 * - The category name is missing or empty.
 * - No category exists with the given name.
 *
 * @returns {Promise<Array>} A filtered list of products whose category name matches the given name,
 * each populated with `_id`, `name`, and `description` fields of the category.
 */
export const selectProductByCategoryName = async ({ name }) => {
    if (!name || name.trim() === "") {
        throw new Error("Category Name is missing");
    }

    const categoryExists = await findCategoryByName({ name });
    if (!categoryExists) {
        throw new Error("Category doesn't exist");
    }

    const product = await Product.find().populate("category");
    return product.filter(
        (p) => p.category?.name === name.trim().toLowerCase()
    );
};

export const selectProductByPriceRange = async ({ minimum, maximum }) => {
    const min = Number(minimum);
    const max = Number(maximum);

    if (!Number.isFinite(min) || !Number.isFinite(max)) {
        throw new Error("Minimum or Maximum Price is invalid");
    }

    if (min < 0 || max < 0 || min > max) {
        throw new Error(
            "Invalid range: Minimum and Maximum must be >= 0 and Minimum <= Maximum"
        );
    }

    return Product.find({ price: { $gte: min, $lte: max } })
        .sort({ price: 1 })
        .populate("category", "_id name description")
        .lean();
};
