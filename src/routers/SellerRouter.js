import express from "express";
import { createSeller, verifySeller, getSellerVerify, removeSellerVerify, getAllSellerAccounts } from "../controllers/SellerController.js";
import { admin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", createSeller);
router.post("/verify/:seller_id",admin ,verifySeller);
router.post("/remove/:seller_id",admin ,removeSellerVerify);
router.get("/pending", getSellerVerify);
router.get("/sellerAccount", getAllSellerAccounts);

export default router;
