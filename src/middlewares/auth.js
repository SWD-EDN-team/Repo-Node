import jwt from "jsonwebtoken";
import StatusCode from "http-status-codes";
import User from "../models/User.js";
import Seller from "../models/Seller.js";

export const admin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header

  if (!token) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Xác thực token

    const user = await User.findById(decoded.id);
    console.log("user", user);
    if (user.refreshToken === undefined) {
      return res.status(StatusCode.UNAUTHORIZED).json({
        message: "Token has expired, please login again",
      });
    }

    if (decoded.role !== "admin") {
      return res.status(StatusCode.FORBIDDEN).json({
        message: "Access denied, admin only",
      });
    }
    req.user = decoded; // Gắn thông tin user vào req để sử dụng sau
    next();
  } catch (err) {
    return res.status(StatusCode.FORBIDDEN).json({ message: "Invalid token" });
  }
};

export const user = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header

  if (!token) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Xác thực token

    const user = await User.findById(decoded.id);
    // console.log("user", user);
    if (user.refreshToken === undefined) {
      return res.status(StatusCode.UNAUTHORIZED).json({
        message: "Token has expired, please login again",
      });
    }

    req.user = decoded; // Gắn thông tin user vào req để sử dụng sau
    next();
  } catch (err) {
    return res.status(StatusCode.FORBIDDEN).json({ message: "Invalid token" });
  }
};

export const verifySeller = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header
  if (!token) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    if (!decoded) {
      return res.status(StatusCode.UNAUTHORIZED).json({ message:"loi"})
    }
    const seller = await Seller.findOne({seller_id: decoded.id})
    if (!seller) {
      return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Seller not found' });
    }
    req.seller = seller;
    next()
    
  } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
  }
};
