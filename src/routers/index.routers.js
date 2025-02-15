import express from "express";
import userRouter from "../routers/userRouter.js";

const rootRouter = express.Router();

rootRouter.use("/users", userRouter);


export default rootRouter;

///1
