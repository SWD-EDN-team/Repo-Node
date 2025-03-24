import express from "express";
import { admin } from "../middlewares/auth.js";

const router = express.Router();

router.put("/",admin,getPaymentMethod);
router.post("/",createPaymentMethod);

export default router;
