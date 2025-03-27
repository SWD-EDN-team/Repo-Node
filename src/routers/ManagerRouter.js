import express from "express";
import { manager } from "../middlewares/auth.js";
import { acceptSeller, getRequestBecomeSeller } from "../controllers/ManagerController.js";
const router = express.Router();

router.post("/confirmRegisterSeller/:seller_id",manager, acceptSeller);
router.get("/requestBecomeSeller",manager, getRequestBecomeSeller);

export default router;
