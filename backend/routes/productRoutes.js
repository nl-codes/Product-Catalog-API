import express from "express";
import {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProductById);

export default router;
