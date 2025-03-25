import express from "express";
import {
  getCartbyToken,
  createCart,
  addToCart,
  updateCartProduct,
  deleteCartProduct,
} from "../controllers/CartController.js";
import {  userFE } from "../middlewares/auth.js";

import { user } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", user, getCartbyToken);
router.post("/", user, createCart);
router.put("/:id", user, updateCartProduct);
router.delete("/:id", user, deleteCartProduct);
router.post("/add", user, addToCart);
router.get("/", userFE, getCartbyToken)

export default router;
