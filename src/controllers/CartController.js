import Joi from "joi";
import StatusCode from "http-status-codes";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const cartSchema = Joi.object({
  product_id: Joi.string().required().messages({
    "any.required": "product name is required",
    "string.empty": "product name is not empty",
  }),
  quantity: Joi.number().min(1).required().messages({
    "any.required": "quantity is required",
    "number.min": "Quantity must be at least 1",
  }),
});

export const getCartbyToken = async (req, res) => {
  try {
    const cart = await Cart.find({ user_id: req.user.id })
      .populate({
        path: "product_id",
        populate: { path: "category_id" },
      })
      .populate("user_id");
    if (!cart)
      res.status(StatusCode.NOT_FOUND).json({ message: "Wishlist not found" });
    res
      .status(StatusCode.OK)
      .json({ message: "Get all cart in cart with token", cart });
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
// export const getAllCart = async (req, res) =>{
//   try {
//     const cart = await Cart.find();
//     res.status(StatusCode.OK).json({ message: "Get all products in cart" ,Cart});
//   } catch (error) {
//     res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
//   }
// }
export const createCart = async (req, res) => {
  try {
    const { error } = cartSchema.validate(req.body);
    if (error) {
      const message = error.details.map((err) => err.message);
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
    const cart = new Cart({ ...req.body, user_id: req.user.id });
    await cart.save();
    res.status(StatusCode.CREATED).json(cart);
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
// xoá product trong cart
export const deleteProductInCart = async (req, res) => {
  try {
    if (1 == 1) {
      alert("mkk");
    }
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
