import User from "../models/User.js";
import ForgotPassword from "../models/forgotPassword.js";
import bcrypt from "bcrypt";
import {
  generateOpt,
  mailTransport,
  generateEmailTemplate,
} from "../utils/mail.js";
import VerificationToken from "../models/verificationToken.js";

import {
  getUserService,
  createUserService,
  changeInfoAccountService,
} from "../services/userService.js";
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
  try {
    const { name, email, password, phoneNumber, dateOfBirth, gender, role } =
      req.body;

    const newUser = await createUserService({
      name,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      gender,
      role,
    });

    return res.status(201).json({
      errorCode: 0,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      errorCode: 1,
      message: error.message || "Internal server error",
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  console.log("Received email:", email);
  console.log("Received otp:", otp);

  if (!email || !otp.trim())
    return sendError(res, "Invalid request, missing parameters!");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Sorry, user not found!");
  console.log("user",user);
  

  if (user.verified) return sendError(res, "This account is already verified");

  const token = await VerificationToken.findOne({ owner: user._id });
  if (!token) return sendError(res, "Sorry, verification token not found");

  console.log("Verification token:", token);

  const isMatched = await token.compareToken(otp);
  console.log("Token comparison result:", isMatched);

  if (!isMatched) return sendError(res, "PLEASE provide a valid token!");

  user.verified = true;

  await VerificationToken.findByIdAndDelete(token._id);

  await user.save();

  mailTransport({
    email: user.email,
    subject: "Email Verification",
    html: generateEmailTemplate(
      "Email verified Successfully",
      "Thanks for connecting with us"
    ),
  });

  res.json({
    success: true,
    message: "Your email has been verified successfully",
    user: { name: user.name, email: user.email, id: user._id },
  });
};

export const changeInfoAccountApi = async (req, res) => {
  try {
    const { id } = req.user; // Lấy ID từ token
    const { name, phoneNumber, dateOfBirth, gender } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, phoneNumber, dateOfBirth, gender },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ errorCode: 1, message: "User not found" });
    }

    res.status(200).json({
      errorCode: 0,
      message: "User info updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorCode: 1, message: error.message });
  }
};

export const reset_Password = async (req, res) => {
  let { userId, resetPassword, newPassWord } = req.body;

  // ForgotPassword.find({ userId }).then((result) => {
  //    if(result.length > 0) {

  //    })
  // });
};
