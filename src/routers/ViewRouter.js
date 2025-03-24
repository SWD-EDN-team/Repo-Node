import express from "express";
import { viewDetailProdct, viewForgotPassword, viewHome, viewLogin, viewManageAddress, viewMyOrder, viewMyWishList, viewOTP, viewProductList, viewSaveCard, viewSignup, viewSuccessful } from "../controllers/viewsController.js";
import {searchProduct} from '../controllers/ProductController.js'
const viewRouter = express.Router();

viewRouter.get("/", (req, res) => {
  res.render("home/home");
});
viewRouter.get("/home", viewHome);
viewRouter.get("/products/page/:pageNumber", viewProductList);
viewRouter.get("/products/filter", searchProduct);
viewRouter.get("/my-orders", viewMyOrder);
viewRouter.get("/detailProduct/:id", viewDetailProdct);
viewRouter.get("/manageAddress", viewManageAddress);
viewRouter.get("/myWishList", viewMyWishList);
viewRouter.get("/saveCard", viewSaveCard);
viewRouter.get("/login", viewLogin);
viewRouter.get("/signup", viewSignup);
viewRouter.get("/forgotpassword", viewForgotPassword);
viewRouter.get("/otp", viewOTP);
viewRouter.get("/successful", viewSuccessful);
viewRouter.get("/payment", viewPayment);

export default viewRouter;
