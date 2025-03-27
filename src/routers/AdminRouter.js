import express from "express";
import { admin } from "../middlewares/auth.js";
import { createPaymentMethod, getPaymentMethod } from "../controllers/PaymentMethodController.js";
import { createManager } from "../controllers/adminController.js";

const router = express.Router();

router.put("/",admin,getPaymentMethod);
router.post("/",createPaymentMethod);
router.post("/createManager",admin,createManager);

export default router;
