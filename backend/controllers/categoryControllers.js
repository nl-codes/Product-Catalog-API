// Import service-level functions for handling category data operations
import {
    changeCategoryById,
    createCategory,
    findCategoryById,
    listAllCategory,
    removeCategoryById,
} from "../services/categoryService.js";

/**
 * @function getAllCategories
 * @description Controller to retrieve all categories from the database.
 *              Responds with a list of all available categories in JSON format.
 *              Calls the service layer's `listAllCategory` function.
 * @route GET /api/category
 */
export const getAllCategories = async (req, res) => {
    try {
        const categories = await listAllCategory();
        res.status(200).json(categories);
    } catch (err) {
        console.error("❌ Error fetching categories: ", err);
        res.status(500).json({ error: "Error fetching categories" });
    }
};

/**
 * @function getCategoryById
 * @description Controller to retrieve categories from the database based on given category id.
 *              Responds with a details of the category found in JSON format.
 *              Calls the service layer's `findCategoryById` function.
 * @route GET /api/category/:id
 */
export const getCategoryById = async (req, res) => {
    try {
        const searchedCategory = await findCategoryById(req.params);
        if (!searchedCategory) {
            return res.status(404).json({ error: "Category id not found" });
        }
        return res.status(200).json(searchedCategory);
    } catch (err) {
        console.error("❌ Error:", err.message);
        const status = err.message === "Category id is required" ? 404 : 400;
        return res.status(status).json({ error: err.message });
    }
};
/**
 * @function addCategory
 * @description Controller to add a new category to the database.
 *              Accepts category data from the request body and delegates creation to `createCategory`.
 *              Handles duplicate category errors and responds accordingly.
 * @route POST /api/category
 */
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

/**
 * @function updateCategoryById
 * @description Controller to update an existing category by its ID.
 *              Expects `id` in the request parameters and updated data in the request body.
 *              Delegates the update operation to `changeCategoryById`.
 *              Returns the updated category or an appropriate error if not found.
 * @route PUT /api/category/:id
 */
export const updateCategoryById = async (req, res) => {
    try {
        const editedCategory = await changeCategoryById(req.params, req.body);
        res.status(200).json(editedCategory);
    } catch (err) {
        console.error("❌ Error:", err.message);
        const status = err.message === "Category doesn't exist" ? 404 : 400;
        return res.status(status).json({ error: err.message });
    }
};

/**
 * @function deleteCategoryById
 * @description Controller to delete a category by its ID.
 *              Expects `id` in the request parameters and delegates deletion to `removeCategoryById`.
 *              Responds with a success message or an error if the category doesn't exist.
 * @route DELETE /api/category/:id
 */
export const deleteCategoryById = async (req, res) => {
    try {
        await removeCategoryById(req.params);
        return res.status(200).json({
            message: `Category of id ${req.params.id} has been deleted.`,
        });
    } catch (err) {
        console.error("❌ Error:", err.message);
        const status = err.message === "Category doesn't exist" ? 404 : 400;
        return res.status(status).json({ error: err.message });
    }
};
