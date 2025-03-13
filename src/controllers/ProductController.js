import Joi from "joi";
import StatusCode from "http-status-codes";
import mongoose from "mongoose";
import Product from "../models/product.js";
import {
  uploadSingleFile,
  uploadMultipleFiles,
} from "../services/fileService.js";

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

export const updateProductSchema = Joi.object({
  product_name: Joi.string().optional(),
  description: Joi.string().optional(),
  stoke_quantity: Joi.number().integer().min(0).optional(),
  discount: Joi.number().min(0).max(100).optional(),
  price: Joi.number().min(0).optional(),
});

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createProduct = async (req, res) => {
  console.log("Received files:", req.files);
  console.log("Received body:", req.body);

  const { error } = productSchema.validate(req.body);
  if (error) {
    const message = error.details.map((err) => err.message);
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message,
    });
  }
  let imagePaths = [];
  if (req.files && req.files.image) {
    const files = Array.isArray(req.files.image)
      ? req.files.image
      : [req.files.image];

    for (let file of files) {
      const uploadResult = await uploadSingleFile(file);
      console.log("File uploaded result: ", uploadResult);
      if (uploadResult.status === "success") {
        imagePaths.push(uploadResult.path);
      }
    }
  }

  try {
    const product = new Product({
      ...req.body,
      seller_id: req.seller._id,
      image: imagePaths,
    });

    await product.save();
    res.status(StatusCode.CREATED).json(product);
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { category_id } = req.params;
    console.log("Received category_id:", category_id);

    // Kiểm tra xem category_id có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(category_id)) {
      return res.status(400).json({ message: "category_id không hợp lệ" });
    }

    // Kiểm tra xem có sản phẩm nào thuộc category_id không
    let products = await Product.find({ category_id });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "Không có sản phẩm nào thuộc danh mục này" });
    }

    let updateData = { ...req.body };

    // Nếu có file ảnh mới được tải lên, xử lý upload
    if (req.files && req.files.image) {
      const files = Array.isArray(req.files.image)
        ? req.files.image
        : [req.files.image];
      const uploadResult = await uploadMultipleFiles(files);

      // Nếu upload thành công, cập nhật đường dẫn ảnh mới
      const newImagePaths = uploadResult.detail
        .filter((file) => file.status === "success")
        .map((file) => `/images/upload/${file.path}`);

      if (newImagePaths.length > 0) {
        updateData.image = newImagePaths;
      }
    }

    // Cập nhật tất cả sản phẩm theo category_id
    let updatedProducts = await Product.updateMany(
      { category_id },
      { $set: updateData }
    );

    return res.json({
      message: "Cập nhật sản phẩm thành công",
      updatedCount: updatedProducts.modifiedCount,
    });
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { category_id } = req.params;

  try {
    const products = await Product.find({ category_id });

    if (products.length === 0) {
      return res.status(404).json({
        message: "Không có sản phẩm nào thuộc danh mục này",
      });
    }

    const deletedProducts = await Product.deleteMany({ category_id });

    res.status(200).json({
      message: "Xoá sản phẩm thành công",
      deletedCount: deletedProducts.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
