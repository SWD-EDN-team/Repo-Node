import express from "express";
import { createReview, deleteReview, getAllReview } from "../controllers/ReviewController.js";
import { customer} from "../middlewares/auth.js";


const router = express.Router();

router.get("/",getAllReview);
router.post("/",customer,createReview);
router.delete("/:id",customer,deleteReview);


export default router;
