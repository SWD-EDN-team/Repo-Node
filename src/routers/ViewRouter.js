import express from "express";
import { viewDetailProdct, viewForgotPassword, viewHome, viewLogin, viewManageAddress, viewMyOrder, viewMyWishList, viewOTP, viewProductList,viewReview, viewSaveCard, viewSignup, viewSuccessful,viewPayment, viewCart, viewProfile, viewShippingAddress, viewAddProduct, viewManageProduct, viewManageReview, viewProfileSeller } from "../controllers/viewsController.js";
import {searchProduct} from '../controllers/ProductController.js'
import { customer, seller} from "../middlewares/auth.js"
import { viewOrderDetailsBySeller } from "../controllers/OrderDetailController.js";
const viewRouter = express.Router();

viewRouter.get("/", (req, res) => {
  res.render("home/home");
});
viewRouter.get("/home", viewHome);
viewRouter.get("/products/page/:pageNumber", viewProductList);
viewRouter.get("/products/filter", searchProduct);
viewRouter.get("/cart", customer, viewCart);
viewRouter.get("/my-orders", viewMyOrder);
viewRouter.get("/detailProduct/:id", viewDetailProdct);
viewRouter.get("/manageAddress",userFE, viewManageAddress);
viewRouter.get("/myWishList", viewMyWishList);
viewRouter.get("/saveCard", viewSaveCard);
viewRouter.get("/login", viewLogin);
viewRouter.get("/signup", viewSignup);
viewRouter.get("/forgotpassword", viewForgotPassword);
viewRouter.get("/otp",customer, viewOTP);
viewRouter.get("/successful", viewSuccessful);
viewRouter.get("/payment", viewPayment);
viewRouter.get("/reviewProduct", viewReview);
viewRouter.get("/shippingAddress",customer, viewShippingAddress);
viewRouter.get("/profile", customer, viewProfile);
viewRouter.get("/addProduct", viewAddProduct);
viewRouter.get("/manageProduct", viewManageProduct);
viewRouter.get("/manageOrder",seller,viewOrderDetailsBySeller)
viewRouter.get("/manageReview", viewManageReview);
viewRouter.get("/profileSeller",seller,viewProfileSeller);

export default viewRouter;
