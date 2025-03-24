import express from "express";
import { viewDetailProdct, viewForgotPassword, viewHome, viewLogin, viewManageAddress, viewMyOrder, viewMyWishList, viewOTP, viewPayment,viewReview, viewSaveCard, viewSignup, viewSuccessful } from "../controllers/viewsController.js";
import {  userFE } from "../middlewares/auth.js";
const viewRouter = express.Router();

viewRouter.get("/", (req, res) => {
  res.render("home/home");
});
viewRouter.get("/home", viewHome);
viewRouter.get("/my-orders", viewMyOrder);
viewRouter.get("/detailProduct", viewDetailProdct);
viewRouter.get("/manageAddress", viewManageAddress);
viewRouter.get("/myWishList", viewMyWishList);
viewRouter.get("/saveCard", viewSaveCard);
viewRouter.get("/login", viewLogin);
viewRouter.get("/signup", viewSignup);
viewRouter.get("/forgotpassword", viewForgotPassword);
viewRouter.get("/otp",userFE, viewOTP);
viewRouter.get("/successful", viewSuccessful);
viewRouter.get("/payment", viewPayment);
viewRouter.get("/reviewProduct", viewReview);

export default viewRouter;
