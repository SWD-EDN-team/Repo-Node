import Joi from "joi";
import StatusCode from "http-status-codes";
import Category from "../models/Category.js";

const categorySchema = Joi.object({
  category_name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name is not empty",
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
    "string.empty": "Description is not empty",
  }),
});

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
}
export const createCategory = async (req, res) => {

  const { error } = categorySchema.validate(req.body);
  if (error) {
    const message = error.details.map((err) => err.message);
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message,
    });
  }

  try {
    const category = new Category(req.body);
    await category.save();
    res.status(StatusCode.CREATED).json(category);
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}