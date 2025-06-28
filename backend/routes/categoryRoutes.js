import express from "express";
import {
    addCategory,
    deleteCategoryById,
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    updateCategoryById,
} from "../controllers/categoryControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllCategories);
router.get("/:id", verifyToken, getCategoryById);
router.get("/name/:name", verifyToken, getCategoryByName);
router.post("/", verifyToken, addCategory);
router.put("/:id", verifyToken, updateCategoryById);
router.delete("/:id", verifyToken, deleteCategoryById);

export default router;
