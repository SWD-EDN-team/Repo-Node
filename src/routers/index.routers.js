import express from "express";
import userRouter from "../routers/userRouter.js";
import authRouter from "../routers/authRouter.js";
import addressRouter from "../routers/addressRouter.js"
import VoucherRouter from "../routers/voucherRouter.js"
import SellerRouter from "../routers/SellerRouter.js"
import ProductRouter from "../routers/ProductRouter.js"
import CategoryRouter from "../routers/CategoryRouter.js"
import ReviewRouter from "../routers/ReviewRouter.js"
import CartRouter from "../routers/CartRouter.js"
import WishlistRouter from "../routers/WishlistRouter.js"
import PaymentMethodRouter from "../routers/PaymentMethodRouter.js"
import OrderRouter from "../routers/OrderRouter.js"
import OrderDetailRouter from "../routers/OrderDetailRouter.js"
import ManagerRouter from "../routers/ManagerRouter.js"
const rootRouter = express.Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/address", addressRouter);
rootRouter.use("/voucher", VoucherRouter);
rootRouter.use("/seller", SellerRouter);
rootRouter.use("/product", ProductRouter);
rootRouter.use("/category", CategoryRouter);
rootRouter.use("/review", ReviewRouter);
rootRouter.use("/cart", CartRouter);
rootRouter.use("/wishlist", WishlistRouter);
rootRouter.use("/paymentMethod", PaymentMethodRouter);
rootRouter.use("/order", OrderRouter);
rootRouter.use("/orderDetail", OrderDetailRouter);
rootRouter.use("/manager", ManagerRouter);

export default rootRouter;

///1
