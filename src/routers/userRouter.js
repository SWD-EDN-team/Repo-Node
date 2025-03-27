import express from "express";
import {
  getUserApi,
  createUserApi,
  changeInfoAccountApi,
  getUserById,
} from "../controllers/userController.js";
import { authMiddleware, customer } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get("/", getUserApi);
userRouter.post("/", createUserApi);
userRouter.put("/update-info", authMiddleware, changeInfoAccountApi);
userRouter.get("/:id", getUserById);

export default userRouter;
