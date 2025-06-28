import express from "express";
import {
    addProduct,
    deleteProductById,
    filterProductByCategoryId,
    filterProductByCategoryName,
    filterProductByPriceRange,
    getAllProducts,
    getProductById,
    searchProductByName,
    updateProductById,
} from "../controllers/productController.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllProducts);
router.get("/:id", verifyToken, getProductById);
router.get(
    "/filter-by/category/id/:id",
    verifyToken,
    filterProductByCategoryId
);
router.get(
    "/filter-by/category/name/:name",
    verifyToken,
    filterProductByCategoryName
);
router.get("/filter-by/price", verifyToken, filterProductByPriceRange);
router.get("/search-by/name/:searchTerm", verifyToken, searchProductByName);
router.post("/", verifyToken, verifyRole("admin"), addProduct);
router.put("/:id", verifyToken, verifyRole("admin"), updateProductById);
router.delete("/:id", verifyToken, verifyRole("admin"), deleteProductById);

export default router;
