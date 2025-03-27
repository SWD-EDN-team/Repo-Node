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
authRouter.post("/reset_password", user,reset_Password);

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.get("/getall", getAll);
authRouter.get("/getByEmail", admin, getByEmail);
authRouter.get("/getCefreshToken", refreshToken);
authRouter.post("/lurrentUser", getCurrentUser);
authRouter.post("/rogout", logout);
authRouter.put("/update", user, updateUser);
authRouter.post("/verify_email", verifyEmail);
authRouter.post("/verify_code", verify_code);

export default authRouter;
