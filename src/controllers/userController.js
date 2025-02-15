import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getUserApi = async (req, res) => {
  let results = await User.find({});

  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

export const createUserApi = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      gender = "male",
      role = "user",
    } = req.body;

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: name,
      role,
      gender,
      phoneNumber,
      dateOfBirth,
      status: "active",
    });

    return res.status(201).json({
      errorCode: 0,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: 2,
      message: "Internal server error",
      error: error.message,
    });
  }
};
