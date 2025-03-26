import express from "express";
import {
  getUserApi,
  createUserApi,
  changeInfoAccountApi,
} from "../controllers/userController.js";
import { customer } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get("/", getUserApi);
userRouter.post("/", createUserApi);
userRouter.put("/update-info", customer, changeInfoAccountApi);

export default userRouter;
