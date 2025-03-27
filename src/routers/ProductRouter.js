import express from "express";
import { verifySeller } from "../middlewares/auth.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, getProductByPage, getProductCategory, getProductCurrent, getProductList, updateProduct } from "../controllers/ProductController.js";


const router = express.Router();

router.get("/",getAllProducts);
router.get("/category",getProductCategory);
// router.get("/:page",getProductByPage);
router.get("/seller", verifySeller ,getProductCurrent);
router.get("/productDetail/:id",getProductById);
router.post("/",verifySeller,createProduct);
router.get("/page/:pageNumber", getProductList);
router.put("/:id",verifySeller, updateProduct)
router.delete("/:id",verifySeller, deleteProduct)


export default router;