import express from "express";
import { getCartbyToken,createCart, addProductToCart, removeProductInCart } from "../controllers/CartController.js";
import { user } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",user,getCartbyToken);
router.post("/",user,createCart);
router.put("/addProduct",user,addProductToCart);
router.put("/removeProduct",user,removeProductInCart);

export default router;
