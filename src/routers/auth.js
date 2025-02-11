import express from "express";
import {
  signup,
  signin,
  getAll,
  getByEmail,
  getCurrentUser,
  refreshToken,
  logout,
  updateUser,
} from "../controllers/auth.js";
import { admin, user } from "../middlewares/auth.js";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.get("/auth/getall", admin, getAll);
router.get("/auth/getByEmail", admin, getByEmail);
router.get("/auth/getCurrentUser", getCurrentUser);
router.post("/auth/refreshToken", refreshToken);
router.post("/auth/logout", logout);
router.put("/auth/update", user, updateUser);

export default router;
