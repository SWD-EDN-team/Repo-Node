import express from "express";
import { createSeller, verifySeller, getSellerVerify, removeSellerVerify, uploadAvatar } from "../controllers/SellerController.js";
import { admin, customer, seller } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", customer ,createSeller);
router.post("/verify/:seller_id",admin ,verifySeller);
router.post("/remove/:seller_id",admin ,removeSellerVerify);
router.get("/pending", getSellerVerify);
router.post("/upload-avatar", seller, uploadAvatar);


export default router;
