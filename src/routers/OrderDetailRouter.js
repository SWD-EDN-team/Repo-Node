import express from "express";
import { user } from "../middlewares/auth.js";
import { getOrderDetailByOrder } from "../controllers/OrderDetailController.js";

const router = express.Router();

router.get("/:order_id", user, getOrderDetailByOrder);

export default router;
