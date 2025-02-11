import express from "express";
import {
  getAddress,
  getAddressbyId,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";

const router = express.Router();

router.get("/", getAddress);
router.get("/:id", getAddressbyId);
router.post("/", createAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export default router;
