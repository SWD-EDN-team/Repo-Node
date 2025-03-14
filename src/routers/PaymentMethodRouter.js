import express from "express";
import {
  createPaymentMethod,
  getPaymentMethod,
} from "../controllers/PaymentMethodController.js";

const router = express.Router();

router.get("/", getPaymentMethod);
router.post("/", createPaymentMethod);

export default router;
