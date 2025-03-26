import jwt from "jsonwebtoken";
import StatusCode from "http-status-codes";
import User from "../models/User.js";
import Seller from "../models/Seller.js";


const auth = ({ requiredRole = null } = {}) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    let token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    // Nếu không có token trong header, thử lấy từ cookie
    if (!token) {
      token = req.cookies?.token || null;
    }

    if (!token) {
      return res.status(StatusCode.UNAUTHORIZED).json({
        errorCode: 1,
        message: "No token provided",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded", decoded);
      const user = await User.findById(decoded.id);
      
      console.log("user", user);
      if (user.refreshToken === undefined) {
        return res.status(StatusCode.UNAUTHORIZED).json({
          message: "Token has expired, please login again",
        });
      }
      if (decoded.role !== requiredRole) {
        return res.status(StatusCode.UNAUTHORIZED).json({
          message: `Not ${requiredRole} please login`,
        });
      }
      req.user = decoded;
      req.user.email = user.email
      next();
    } catch (err) {
      return res.status(StatusCode.FORBIDDEN).json({ message: "Invalid token" });
    }
}
}
 export const admin = auth({role: 'user'})
 export const customer = auth({role: 'customer'})
 export const seller = auth({role: 'seller'})
 export const manager = auth({role: 'manager'})