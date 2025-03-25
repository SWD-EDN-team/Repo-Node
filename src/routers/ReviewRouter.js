import express from "express";
import { createReview, deleteReview, getAllReview } from "../controllers/ReviewController.js";
import { user } from "../middlewares/auth.js";


const router = express.Router();

router.get("/",getAllReview);
router.post("/",user,createReview);
router.delete("/:id",user,deleteReview);


export default router;
