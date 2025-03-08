import express from "express";
import { getCartbyToken,createCart } from "../controllers/CartController.js";
import { user } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",user,getCartbyToken);
router.post("/",user,createCart);

export default router;
