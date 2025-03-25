import express from "express";
import { getCartbyToken,createCart, addToCart, removeFromCart} from "../controllers/CartController.js";
import { user } from "../middlewares/auth.js";
import {  userFE } from "../middlewares/auth.js";
const router = express.Router();

// router.get("/",user,getCartbyToken);
router.post("/",user,createCart);
router.post("/add",user, addToCart );
router.get("/", userFE, getCartbyToken);
router.delete("/remove/:id", userFE, removeFromCart);
export default router;
