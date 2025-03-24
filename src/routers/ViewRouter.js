import express from "express";
import { viewDetailProdct, viewForgotPassword, viewHome, viewLogin, viewManageAddress, viewMyOrder, viewMyWishList, viewOTP, viewSaveCard, viewSignup, viewSuccessful } from "../controllers/viewsController.js";
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
viewRouter.get("/otp", viewOTP);
viewRouter.get("/successful", viewSuccessful);

export default viewRouter;
