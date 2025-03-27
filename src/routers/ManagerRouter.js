import express from "express";
import { manager } from "../middlewares/auth.js";
const router = express.Router();

router.post("/confirmRegisterSeller",manager, acceptSeller);

export default router;
