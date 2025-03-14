import Joi from "joi";
import StatusCode from "http-status-codes";
import Cart from "../models/Cart.js";
// import Product from "../models/Product.js";

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

export const updateCartProduct = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id; // Lấy user_id từ token

    if (quantity <= 0) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ message: "Quantity must be greater than 0" });
    }

    const cartItem = await Cart.findOne({ user_id, product_id });

    if (!cartItem) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "Product not found in cart" });
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    return res
      .status(StatusCode.OK)
      .json({ message: "Cart updated successfully", cart: cartItem });
  } catch (error) {
    console.error("Error updating cart:", error);
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const deleteCartProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    // Lấy user_id từ token (req.user đã được gán từ middleware)
    const user_id = req.user.id;

    // const cartItem = await Cart.findOne({ user_id, product_id });
    const cartItem = await Cart.find({ user_id: req.user.id });
    console.log("cartItem", cartItem);

    if (!cartItem) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "Product not found in cart" });
    }
    await Cart.deleteOne({ _id: cartItem._id });
    return res
      .status(StatusCode.OK)
      .json({ message: "Product removed from cart" });
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
