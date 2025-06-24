import express from "express";
import {
    addCategory,
    getAllCategories,
    updateCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", addCategory);
router.put("/:id", updateCategory);

export default router;
