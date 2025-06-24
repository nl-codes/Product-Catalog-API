import express from "express";
import {
    addCategory,
    getAllCategories,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", addCategory);

export default router;
