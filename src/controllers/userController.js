import User from "../models/user.js";
import bcrypt from "bcrypt";
import {
  generateOpt,
  mailTransport,
  generateEmailTemplate,
} from "../utils/mail.js";
import VerificationToken from "../models/verificationToken.js";

import { getUserService, createUserService } from "../services/userService.js";
import { sendError } from "../utils/helper.js";
import { isValidObjectId } from "mongoose";

export const getUserApi = async (req, res) => {
  try {
    const results = await getUserService();
    return res.status(200).json({
      errorCode: 0,
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: 2,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createUserApi = async (req, res) => {
  let {
    name,
    email,
    password,
    phoneNumber,
    dateOfBirth,
    gender = "male",
    role = "user",
  } = req.body;

  let data = { name, email, password, phoneNumber, dateOfBirth, gender, role };

  if (data) {
    let results = await createUserService(data);
    return res.status(200).json({
      errorCode: 0,
      data: results,
    });
  } else {
    return res.status(500).json({
      errorCode: 2,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp.trim())
    return sendError(res, "Invalid request , missing parameters!");

  if (!isValidObjectId(userId)) return sendError(res, "Invalid user Id!");

  const user = await User.findById(userId);
  if (!user) return sendError(res, "Sorry , user not found!");

  if (user.verified) return sendError(res, "This account is already verified");

  const token = await VerificationToken.findOne({ owner: user._id });

  if (!token) return sendError(res, "Sorry , user not found");

  const isMatched = await token.compareToken(otp);
  if (!isMatched) return sendError(res, "PLEASE provide a valied token!");

  user.verified = true;

  await VerificationToken.findByIdAndDelete(token._id);

  await user.save();

  mailTransport({
    email: user.email,
    subject: "MÃ OTP Verification",
    html: generateEmailTemplate(
      "Email verified Successfully",
      "Thanks for connecting with us"
    ),
  });
  res.json({
    success: true,
    message: "Your email verified successfully",
    user: { name: user.name, email: user.email, id: user._id },
  });
};
