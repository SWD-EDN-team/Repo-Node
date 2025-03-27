import express from "express";
import { customer } from "../middlewares/auth.js";
import { createOrderFormCartV2,getAllOrders } from "../controllers/OrderController.js";


const router = express.Router();

router.get("/", getAllOrders);
router.post("/createOrder", customer, createOrderFormCartV2);

export default router;
