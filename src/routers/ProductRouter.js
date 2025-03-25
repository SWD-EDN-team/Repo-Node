import express from "express";
import { verifySeller } from "../middlewares/auth.js";
import { createProduct, getAllProducts, getProductById, getProductByPage, getProductList } from "../controllers/ProductController.js";


const router = express.Router();

router.get("/",getAllProducts);
// router.get("/:page",getProductByPage);
router.get("/:id",getProductById);
router.post("/",verifySeller,createProduct);
router.get("/page/:pageNumber", getProductList);



export default router;