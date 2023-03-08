import express from "express";
import {
    getProduct,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.js";

const router = express.Router();

router.get("/:id", getProduct);
router.get("/", getProducts);

router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
