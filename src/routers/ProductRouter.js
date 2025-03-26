import express from "express";
import { seller } from "../middlewares/auth.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, getProductByPage, getProductCurrent, getProductList, updateProduct } from "../controllers/ProductController.js";


const router = express.Router();

router.get("/",getAllProducts);
// router.get("/:page",getProductByPage);
router.get("/seller", seller ,getProductCurrent);
router.get("/productDetail/:id",getProductById);
router.post("/",seller,createProduct);
router.get("/page/:pageNumber", getProductList);
router.put("/:id",seller, updateProduct)
router.delete("/:id",seller, deleteProduct)


export default router;