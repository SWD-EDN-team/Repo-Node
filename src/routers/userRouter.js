import express from "express";
import {
  getUserApi,
  createUserApi,
  changeInfoAccountApi,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get("/", getUserApi);
userRouter.post("/", createUserApi);
userRouter.put("/update-info", authMiddleware, changeInfoAccountApi);

export default userRouter;
