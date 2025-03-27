import express from "express";
import { customer, seller} from "../middlewares/auth.js";
import { getOrderDetailByOrder, getOrderDetailsBySeller } from "../controllers/OrderDetailController.js";

const router = express.Router();

router.get("/seller", seller, getOrderDetailsBySeller);
router.get("/orderDetail/:order_id", customer, getOrderDetailByOrder);

export default router;
