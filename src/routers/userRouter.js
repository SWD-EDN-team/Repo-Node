import express from "express";
import {
  getUserApi,
  createUserApi,
  changeInfoAccountApi,
  getUserById,
  uploadAvatar,
  updateUserProfile
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get("/", getUserApi);
userRouter.post("/", createUserApi);
// userRouter.put("/update-info", authMiddleware, changeInfoAccountApi);
userRouter.put("/update-info", authMiddleware, updateUserProfile);
userRouter.get("/:id", getUserById);
userRouter.post("/upload-avatar", authMiddleware, uploadAvatar);

export default userRouter;
