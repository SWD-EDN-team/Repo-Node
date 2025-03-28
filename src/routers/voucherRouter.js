import express from "express";
import {
  getVoucher,
  getVoucherById,
  createVoucher,
  deleteVoucher,
  updateVoucher,
} from "../controllers/voucherController.js";
//
const router = express.Router();

router.get("/", getVoucher);
router.post("/", createVoucher);
router.get("/:id", getVoucherById);
router.delete("/:id", deleteVoucher);
router.put("/:id", updateVoucher);

export default router;
