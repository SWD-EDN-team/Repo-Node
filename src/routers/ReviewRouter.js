import express from "express";
import { createReview, deleteReview, getAllReview, getAllReviewByProductId } from "../controllers/ReviewController.js";
import { customer} from "../middlewares/auth.js";


const router = express.Router();

router.get("/",getAllReview);
router.get("/:product_id",getAllReviewByProductId);
router.post("/",customer,createReview);
router.delete("/:id",customer,deleteReview);


export default router;
