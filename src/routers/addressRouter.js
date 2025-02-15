import express from "express";
import { user } from "../middlewares/auth.js";
import {
  getAddress,
  getAddressbyId,
  getAddressbyUser,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";

const router = express.Router();

router.get("/", user, getAddress);
router.get("/current", user, getAddressbyUser);
router.get("/:id", user, getAddressbyId);
router.post("/", user, createAddress);
router.put("/:id", user, updateAddress);
router.delete("/:id", user, deleteAddress);

export default router;
