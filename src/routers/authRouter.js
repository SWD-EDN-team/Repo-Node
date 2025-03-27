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
import { admin, customer, seller } from "../middlewares/auth.js";
import { verifyEmail, reset_Password } from "../controllers/userController.js";

const authRouter = express.Router();
authRouter.post("/reset_password", seller, reset_Password);
authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.get("/getall", getAll);
authRouter.get("/getByEmail", admin, getByEmail);
authRouter.get("/getCurrentUser",customer, getCurrentUser);
authRouter.post("/refreshToken", refreshToken);
authRouter.post("/logout", logout);
authRouter.put("/update", seller, updateUser);
authRouter.post("/verify_email", verifyEmail);
authRouter.post("/verify_code", verify_code);

export default authRouter;
