import Joi from "joi";
import StatusCode from "http-status-codes";
import Product from "../models/product.js";
import { uploadSingleFile } from "../services/fileService.js";

const productSchema = Joi.object({
  product_name: Joi.string().required().messages({
    "any.required": "product name is required",
    "string.empty": "product name is not empty",
  }),
  category_id: Joi.string().required().messages({
    "any.required": "category id is required",
    "string.empty": "category id is not empty",
  }),
  description: Joi.string().min(10).max(1000).required().messages({
    "any.required": "description is required",
    "string.empty": "description is not empty",
    "string.min": "description must be at least 10 characters long",
    "string.max": "description must be at most 500 characters long",
  }),
  price: Joi.number().required().messages({
    "any.required": "price is required",
    "number.required": "price must be a number",
  }),
  stoke_quantity: Joi.number().required().messages({
    "any.required": "quantity is required",
    "number.required": "quantity must be a number",
  }),
});

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) res.status(StatusCode.NOT_FOUND).json({ message: "Product not found" });
    res.status(StatusCode.OK).json(product);
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
export const getProductByPage = async (req, res) => {
  try {
    const page = await req.params.page
    const limit = 5,
    startIndex = (+page - 1) * limit;
    const products = await Product.find().skip(startIndex).limit(limit);
    res.status(StatusCode.OK).json(products);
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
export const createProduct = async (req, res) => {

  console.log("Received files:", req.files); // Log file nhận được
  console.log("Received body:", req.body);   // Log dữ liệu khác

  const { error } = productSchema.validate(req.body);
  if (error) {
    const message = error.details.map((err) => err.message);
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message,
    });
  }
  let imagePaths = [];
  if (req.files && req.files.image) {
      const files = Array.isArray(req.files.image) ? req.files.image : [req.files.image];

      for (let file of files) {
        const uploadResult = await uploadSingleFile(file);
        console.log("File uploaded result: ", uploadResult);
        if (uploadResult.status === "success") {
          imagePaths.push(uploadResult.path);
        }
      }
    }

  try {
    const product = new Product({ ...req.body, seller_id: req.seller._id,image: imagePaths });

    await product.save();
    res.status(StatusCode.CREATED).json(product);
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
