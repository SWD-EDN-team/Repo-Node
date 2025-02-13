import express from "express";
import { getUserApi, createUserApi } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getUserApi);
userRouter.post("/", createUserApi);

export default userRouter;
