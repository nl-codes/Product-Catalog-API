import express from "express";
import {
    addProduct,
    deleteProductById,
    filterProductByCategoryId,
    filterProductByCategoryName,
    filterProductByPriceRange,
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
router.get("/filter-by/category/name/:name", filterProductByCategoryName);
router.get("/filter-by/price", filterProductByPriceRange);

export default router;
