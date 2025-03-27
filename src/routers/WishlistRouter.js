import express from "express";
import { createWishList, getWishlistBytoken } from "../controllers/WishlistController.js";
import {customer } from "../middlewares/auth.js";


const router = express.Router();

router.get("/",customer,getWishlistBytoken);
router.post("/",customer,createWishList);
router.delete("/:id",customer,removeWishlist);

export default router;
