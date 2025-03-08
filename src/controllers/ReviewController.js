import Joi from "joi";
import StatusCode from "http-status-codes";
import Review from "../models/Review.js";
const reviewSchema = Joi.object({
  product_id: Joi.string().required().messages({
      "any.required": "product_id is required",
      "string.empty": "product_id is not empty",
    }),
  rate: Joi.number().min(1).max(5).messages({
    "number.empty": "rate is not empty",
    "number.min": "rate min 1",
    "number.max": "rate max 5",
  }),
  comment: Joi.string().required().messages({
    "any.required": "comment is required",
    "string.empty": "comment is not empty",
  }),
  
})

export const getAllReview = async (req, res) =>{
  try {
    const review = await Review.find().populate("user_id");

    if (review.length === 0) {
      return res.status(StatusCode.NOT_FOUND).json({ message: "Review empty" });
    }

    res.status(StatusCode.OK).json(review);
  } catch (error) {
    console.error(error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
  }
}
export const createReview = async (req, res) =>{
  try {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      const message = error.details.map((err) => err.message);
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message });
    }
    const review = new Review({...req.body, user_id: req.user.id });
    await review.save();

    res.status(StatusCode.CREATED).json(review);
  } catch (error) {
    console.error(error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
  }
}