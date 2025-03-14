import express from "express";
import {
  getCartbyToken,
  createCart,
  updateCartProduct,
  deleteCartProduct,
} from "../controllers/CartController.js";
import { user } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", user, getCartbyToken);
router.post("/", user, createCart);
router.put("/:id", user, updateCartProduct);
router.delete("/:id", user, deleteCartProduct);

export default router;
