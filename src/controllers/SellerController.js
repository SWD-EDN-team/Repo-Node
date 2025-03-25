import Joi from "joi";
import StatusCode from "http-status-codes";
import User from "../models/User.js";
import Seller from "../models/Seller.js";

const createSellerSchema = Joi.object({
  seller_id: Joi.required().messages({
    "any.required": "seller_id is required",
  }),
  store_name: Joi.required().messages({
    "any.required": "store_name is required",
  }),
  store_address: Joi.required().messages({
    "any.required": "store_address is required",
  }),
  store_phone: Joi.string().messages({
      "string.empty": "store_phone is not empty",
  }),
})

export const createSeller = async (req, res) => {
  try {
    const seller = await req.body;
    const { error } = createSellerSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const message = error.details.map((err) => err.message);
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
    //gui email confirm
    const newSeller = new Seller(seller);
    await newSeller.save();
    res.status(201).json(newSeller);
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred during signup Seller. Please try again later.",
    });
  }
}