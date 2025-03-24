import Joi from "joi";
import StatusCode from "http-status-codes";
import Wishlist from "../models/WishList.js";

const wishlistSchema = Joi.object({
  product_id: Joi.string().required().messages({
    "any.required": "product name is required",
    "string.empty": "product name is not empty",
  }),
});

export const getWishlistBytoken = async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ user_id: req.user.id })
      .populate({
        path: "product_id",
        populate: { path: "category_id" },
      })
      .populate("user_id");
    if (!wishlists)
      res.status(StatusCode.NOT_FOUND).json({ message: "Wishlist not found" });
    res
      .status(StatusCode.OK)
      .json({ message: "Get all wishlists in cart with token", wishlists });
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const createWishList = async (req, res) => {
  try {
    const { error } = wishlistSchema.validate(req.body);
    if (error) {
      const message = error.details.map((err) => err.message);
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
    const wishlist = new Wishlist({ ...req.body, user_id: req.user.id });
    await wishlist.save();
    res.status(StatusCode.CREATED).json(wishlist);
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
