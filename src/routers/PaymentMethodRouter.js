import express from "express";
import {
  createPaymentMethod,
  getPaymentMethod,
} from "../controllers/PaymentMethodController.js";
import { checkPaid } from "../services/paymentService.js";

const router = express.Router();

router.get("/checkPay", checkPaid);
router.get("/", getPaymentMethod);
router.post("/", createPaymentMethod);

export default router;
