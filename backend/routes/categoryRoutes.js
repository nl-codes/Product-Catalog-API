import express from "express";
import {
    addCategory,
    deleteCategoryById,
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    updateCategoryById,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.get("/name/:name", getCategoryByName);
router.post("/", addCategory);
router.put("/:id", updateCategoryById);
router.delete("/:id", deleteCategoryById);

export default router;
