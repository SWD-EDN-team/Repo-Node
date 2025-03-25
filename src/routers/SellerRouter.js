import express from "express";
import { createSeller } from "../controllers/SellerController.js";

const router = express.Router();

router.post("/", createSeller);

export default router;