import express from "express";
import { user } from "../middlewares/auth.js";
import { createOrderFormCartV2,getAllOrders } from "../controllers/OrderController.js";


const router = express.Router();

router.get("/", getAllOrders);
router.post("/createOrder", user, createOrderFormCartV2);

export default router;
