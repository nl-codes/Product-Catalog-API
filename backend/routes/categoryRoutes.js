import express from "express";
import {
    addCategory,
    deleteCategoryById,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", addCategory);
router.put("/:id", updateCategoryById);
router.delete("/:id", deleteCategoryById);

export default router;
