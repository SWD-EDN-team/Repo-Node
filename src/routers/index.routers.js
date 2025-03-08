import express from "express";
import userRouter from "../routers/userRouter.js";
import authRouter from "../routers/authRouter.js";

const rootRouter = express.Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/auth", authRouter);

export default rootRouter;

///1
