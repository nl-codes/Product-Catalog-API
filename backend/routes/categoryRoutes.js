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
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/", verifyToken, getAllCategories);
router.get("/:id", verifyToken, getCategoryById);
router.get("/name/:name", verifyToken, getCategoryByName);
router.post("/", verifyToken, verifyRole("admin"), addCategory);
router.put("/:id", verifyToken, verifyRole("admin"), updateCategoryById);
router.delete("/:id", verifyToken, verifyRole("admin"), deleteCategoryById);

export default router;
