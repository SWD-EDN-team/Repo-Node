import path from "path";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import {
  generateOpt,
  mailTransport,
  generateEmailTemplate,
} from "../utils/mail.js";
import VerificationToken from "../models/verificationToken.js";

export const getUserService = async () => {
  try {
    const results = await User.find({});
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createUserService = async (data) => {
  const { email, password, name, role, gender, phoneNumber, dateOfBirth } =
    data;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      role,
      gender,
      phoneNumber,
      dateOfBirth,
      status: "active",
    });

    const OTP = generateOpt();
    const verificationToken = new VerificationToken({
      owner: newUser._id,
      token: OTP,
    });
    await verificationToken.save();

    await mailTransport({
      email: newUser.email,
      subject: "MÃ OTP Verification",
      html: generateEmailTemplate(OTP, newUser.name),
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};
