import express from "express";
import { createWishList, getWishlistBytoken } from "../controllers/WishlistController.js";
import { user } from "../middlewares/auth.js";


const router = express.Router();

router.get("/",user,getWishlistBytoken);
router.post("/",user,createWishList);

export default router;
