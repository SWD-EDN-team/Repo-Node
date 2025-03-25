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
  verify_code,
} from "../controllers/auth.js";
import { admin, user } from "../middlewares/auth.js";
import { verifyEmail, reset_Password } from "../controllers/userController.js";

const authRouter = express.Router();

authRouter.post("/auth/signup", signup);
authRouter.post("/signin", signin);
authRouter.get("/auth/getall", getAll);
authRouter.get("/auth/getByEmail", admin, getByEmail);
authRouter.get("/auth/getCurrentUser", getCurrentUser);
authRouter.post("/auth/refreshToken", refreshToken);
authRouter.post("/auth/logout", logout);
authRouter.put("/auth/update", user, updateUser);

authRouter.post("/verify_email", verifyEmail);

authRouter.post("/verify_code", verify_code);
authRouter.post("/reset_password", reset_Password);

export default authRouter;
