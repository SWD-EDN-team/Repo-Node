import Joi from "joi";
import StatusCode from "http-status-codes";
import PaymentMethod from "../models/PaymentMethod.js";


const paymentMethodSchema = Joi.object({
  method_name: Joi.string().required().messages({
    "any.required": "method name is required",
    "string.empty": "method name is not empty",
  }),
})

export const getPaymentMethod = async (req, res) =>{
  try {
    const paymentMethod = await PaymentMethod.find()
    if (!paymentMethod) {
      return res.status(StatusCode.NOT_FOUND).json({ message: "Payment method not found" });
    }
    res.status(StatusCode.OK).json(paymentMethod);
  } catch (error) {
    console.error(error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
}
export const createPaymentMethod = async (req, res) =>{
  try {
    const { error } = paymentMethodSchema.validate(req.body);
    if (error) {
      const message = error.details.map((err) => err.message);
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
    const paymentMethod = new PaymentMethod(req.body)
    await paymentMethod.save();
    res.status(StatusCode.CREATED).json(paymentMethod);
  } catch (error) {
    console.error(error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
}