import express from "express";
import {
  getUserApi,
  createUserApi,
  changeInfoAccountApi,
  getUserById,
  uploadAvatar,
} from "../controllers/userController.js";
import { authMiddleware, customer } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get("/", getUserApi);
userRouter.post("/", createUserApi);
userRouter.put("/update-info", customer, changeInfoAccountApi);
userRouter.get("/:id", getUserById);
userRouter.post("/upload-avatar",  authMiddleware, uploadAvatar);
export default userRouter;
