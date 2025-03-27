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

export const getAllReview = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    
    const totalReviews = await Review.countDocuments();
    const reviews = await Review.find().populate("user_id").skip(skip).limit(limit);
    
    res.status(200).json({ reviews, total: totalReviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getAllReviewByProductId = async (req, res) => {
  try {
    const { product_id } = req.params;

    const reviews = await Review.find({ product_id })
      .select("_id product_id rate comment user_id createdAt updatedAt")
      .populate("user_id", "name") // Chỉ lấy tên của user
      .lean();

    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
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

export const updateReview = async (req, res) =>{
  try {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      const message = error.details.map((err) => err.message);
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message });
    }
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) {
      return res.status(StatusCode.NOT_FOUND).json({ message: "Review not found" });
    }
    
  } catch (error) {
    console.error(error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
  }
}
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(StatusCode.NOT_FOUND).json({ message: "Review not found" });
    }
    res.status(StatusCode.OK).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
  }
};

