import express from "express";
import { viewDetailProdct, viewForgotPassword, viewHome, viewLogin, viewManageAddress, viewMyOrder, viewMyWishList, viewOTP, viewProductList,viewReview, viewSaveCard, viewSignup, viewSuccessful,viewPayment, viewAddProduct, viewManageProduct, viewManageOrder } from "../controllers/viewsController.js";
import {searchProduct} from '../controllers/ProductController.js'
import {getCartbyToken} from '../controllers/CartController.js'
import { user, verifySellerFE } from "../middlewares/auth.js"
import {  userFE } from "../middlewares/auth.js";
import { viewOrderDetailsBySeller } from "../controllers/OrderDetailController.js";
const viewRouter = express.Router();

viewRouter.get("/", (req, res) => {
  res.render("home/home");
});
viewRouter.get("/home", viewHome);
viewRouter.get("/products/page/:pageNumber", viewProductList);
viewRouter.get("/products/filter", searchProduct);
viewRouter.get("/cart", userFE, getCartbyToken);
viewRouter.get("/my-orders", viewMyOrder);
viewRouter.get("/detailProduct/:id", viewDetailProdct);
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
viewRouter.get("/addProduct", viewAddProduct);
viewRouter.get("/manageProduct", viewManageProduct);
viewRouter.get("/manageOrder",verifySellerFE,viewOrderDetailsBySeller)

export default viewRouter;
