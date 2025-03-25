import express from "express";
import { createReview, getAllReview } from "../controllers/ReviewController.js";
import { user } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllReview);
router.post("/", user, createReview);


export default router;
