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

  const tokenFE = localStorage.getItem("token")
  console.log(tokenFE);
  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Xác thực token

    const user = await User.findById(decoded.id);
    // console.log("user", user);
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
    req.user.email = user.email
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
  
// console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Xác thực token

    const user = await User.findById(decoded.id);
    // console.log("user", user);
    if (user.refreshToken === undefined) {
      return res.status(StatusCode.UNAUTHORIZED).json({
        message: "Token has expired, please login again",
      });
    }
    req.user = user; // Gắn thông tin user vào req để sử dụng sau
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
      return res.status(StatusCode.UNAUTHORIZED).json({ message: "loi" });
    }
    const seller = await Seller.findOne({ seller_id: decoded.id });
    if (!seller) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ message: "Seller not found" });
    }
    req.seller = seller;
    next();
  } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errorCode: 1, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Gán user vào req
    next();
  } catch (error) {
    return res.status(403).json({ errorCode: 1, message: "Invalid token" });
  }
};

export const userFE = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: "No token provided" });
  }
  console.log(token);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Xác thực token

    const user = await User.findById(decoded.id);
    if (user.refreshToken === undefined) {
      return res.status(StatusCode.UNAUTHORIZED).json({
        message: "Token has expired, please login again",
      });
    }

    console.log(user.email);
    
    req.user = decoded; // Gắn thông tin user vào req để sử dụng sau
    req.email = user.email
    req.token = token
    next();
  } catch (err) {
    return res.status(StatusCode.FORBIDDEN).json({ message: "Invalid token" });
  }
};