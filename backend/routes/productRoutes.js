import express from "express";
import {
    addProduct,
    deleteProductById,
    filterProductByCategoryId,
    getAllProducts,
    getProductById,
    updateProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);
router.get("/filter-by/category/id/:id", filterProductByCategoryId);

export default router;
