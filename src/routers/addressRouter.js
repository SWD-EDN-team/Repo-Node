import express from "express";
import { customer } from "../middlewares/auth.js";
import {
  getAddress,
  getAddressbyId,
  getAddressbyUser,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";
const router = express.Router();

router.get("/", customer, getAddress);
router.get("/current", customer, getAddressbyUser);
router.get("/:id", customer, getAddressbyId);
router.post("/", customer, createAddress);
router.put("/:id", customer, updateAddress);
router.delete("/:id", customer, deleteAddress);

export default router;
