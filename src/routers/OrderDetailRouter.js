import express from "express";
import { user, verifySeller } from "../middlewares/auth.js";
import { getOrderDetailByOrder, getOrderDetailsBySeller } from "../controllers/OrderDetailController.js";

const router = express.Router();

router.get("/seller", verifySeller, getOrderDetailsBySeller);
router.get("/orderDetail/:order_id", user, getOrderDetailByOrder);

export default router;
