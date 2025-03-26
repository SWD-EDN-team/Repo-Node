import express from "express";
import { createWishList, getWishlistBytoken ,removeWishlist} from "../controllers/WishlistController.js";
import { user } from "../middlewares/auth.js";


const router = express.Router();

router.get("/",user,getWishlistBytoken);
router.post("/",user,createWishList);
router.delete("/:id",user,removeWishlist);

export default router;
