import express from "express";
import { verifySeller } from "../middlewares/auth.js";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";

const router = express.Router();

router.get("/", verifySeller, getAllProducts);
router.post("/", verifySeller, createProduct);
router.put("/:category_id", verifySeller, updateProduct);
router.delete("/:category_id", verifySeller, deleteProduct);

export default router;
