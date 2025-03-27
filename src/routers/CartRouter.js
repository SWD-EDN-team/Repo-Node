import express from "express";
import { getCartbyToken,createCart, addToCart } from "../controllers/CartController.js";
import { customer } from "../middlewares/auth.js";
const router = express.Router();

// router.get("/",user,getCartbyToken);
// router.delete("/remove/:id", userFE, removeFromCart);
router.post("/",customer,createCart);
router.post("/add",customer, addToCart );
router.get("/", customer, getCartbyToken)
export default router;
