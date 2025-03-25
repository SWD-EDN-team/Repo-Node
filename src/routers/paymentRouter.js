import express from "express";
import {
  createPayment,
  queryTransactionPage,
  refundPage,
  vnpayReturn,
  vnpayIPN,
  orderList,
} from "../controllers/PaymentController.js";

const router = express.Router();
router.get("/", orderList);

router.get("/create-payment", createPayment);
router.post("/create-payment", createPayment);
router.get("/query-transaction", queryTransactionPage);
router.get("/refund", refundPage);
router.get("/vnpay-return", vnpayReturn);
router.post("/vnpay-ipn", vnpayIPN);

export default router;
