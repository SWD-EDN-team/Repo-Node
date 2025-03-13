import express from "express";
import { verifySeller } from "../middlewares/auth.js";
import { createProduct, getAllProducts } from "../controllers/ProductController.js";


const router = express.Router();

router.get("/",getAllProducts);
router.post("/",verifySeller,createProduct);

export default router;