import Joi from "joi";
import StatusCode from "http-status-codes";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";
import {
  generateOpt,
  mailTransport,
  generateEmailTemplate,
} from "../utils/mail.js";
import VerificationToken from "../models/verificationToken.js";


const singupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.empty": "Email is not empty",
    "string.email": "Email must be a valid email address",
  }),
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Name is required",
    "string.empty": "Name is not empty",
    "string.min": "Name must be at least {#limit} characters long",
    "string.max": "Name must be at most {#limit} characters long",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "any.required": "Password is required",
    "string.empty": "Password is not empty",
    "string.min": "Password must be at least {#limit} characters long",
    "string.max": "Password must be at most {#limit} characters long",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.required": "Confirm Password is required",
    "string.empty": "Confirm Password is not empty",
    "string.ref": "Confirm Password must match Password",
  }),
  avatar: Joi.string().uri().messages({
    "string.uri": "Avatar must be a valid URL",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.empty": "Email is not empty",
    "string.email": "Email must be a valid email address",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "any.required": "Password is required",
    "string.empty": "Password is not empty",
    "string.min": "Password must be at least {#limit} characters long",
    "string.max": "Password must be at most {#limit} characters long",
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.empty": "Email is not empty",
    "string.email": "Email must be a valid email address",
  }),
});
const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  gender: Joi.string().valid("male", "female", "other").optional(),
});
export const signup = async (req, res) => {
  try {
    const { email, password, name, avatar, confirmPassword } = await req.body; //lấy dữ liệu
    const { error } = singupSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const message = error.details.map((err) => err.message);
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
    const exitUser = await User.findOne({ email });
    if (exitUser) {
      return res.status(StatusCode.CONFLICT).json({
        message: "Email already exists",
      });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const role = (await User.countDocuments({})) === 0 ? "admin" : "customer";

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      role,
    });

    if (role === "customer") {
      const newCustomer = await Customer.create({
        customer_id: newUser._id,
      });
      await newCustomer.save();
    }
    const accessToken = jwt.sign(
      { id: newUser._id, email: newUser.email,name:newUser.nama, role: newUser.role,verified:newUser.verified },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TIME_TOKEN_EXPIRATION }
    );
    const refreshToken = jwt.sign(
      { id: newUser._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.TIME_REFRESHTOKEN_EXPIRATION }
    );
    res.cookie('token', accessToken, { httpOnly: true });
    const hashedRefreshToken = await bcryptjs.hash(refreshToken, 10);
    newUser.refreshToken = hashedRefreshToken;
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

    await newUser.save();
    newUser.password = undefined;

    res.status(StatusCode.CREATED).json({
      user: newUser,
      accessToken,
      refreshToken,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred during signup. Please try again later.",
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = await req.body;
  const { error } = loginSchema.validate(req.body, {
    abortEarly: false,
  });
  // xử lí nếu gặp lỗi
  if (error) {
    const message = error.details.map((err) => err.message);
    return res.status(StatusCode.BAD_REQUEST).json({ message });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(StatusCode.NOT_FOUND)
      .json({ message: "Email not found" });
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: "Password incorrect" });
  }

  const accessToken = jwt.sign(
    { id: user._id, email: user.email,name: user.name, role: user.role,verified: user.verified },
    process.env.JWT_SECRET,
    { expiresIn: process.env.TIME_TOKEN_EXPIRATION }
  );
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.TIME_REFRESHTOKEN_EXPIRATION }
  );
  res.cookie('token', accessToken, { httpOnly: true });
  const hashedRefreshToken = await bcryptjs.hash(refreshToken, 10);
  user.refreshToken = hashedRefreshToken;
  await user.save();

  user.password = undefined;

  res.json({
    user: user,
    accessToken,
    refreshToken,
    message: "Signin successfully",
  });
};

export const getAll = async (req, res) => {
  try {
    // Lấy token từ header Authorization
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token", token);

    if (!token) {
      return res.status(StatusCode.UNAUTHORIZED).json({
        message: "No token provided",
      });
    }

    // Giải mã token để lấy thông tin người dùng
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded", decoded);

    // Lấy tất cả người dùng từ cơ sở dữ liệu
    const users = await User.find();

    // Kiểm tra nếu không có người dùng nào
    if (users.length === 0) {
      return res.status(StatusCode.NOT_FOUND).json({
        message: "No users found",
      });
    }

    // Trả về danh sách người dùng
    res.status(StatusCode.OK).json({
      users,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    // Xử lý lỗi nếu có
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving users",
      error: error.message,
    });
  }
};

export const getByEmail = async (req, res) => {
  const { email } = await req.body;
  const { error } = emailSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const message = error.details.map((err) => err.message);
    return res.status(StatusCode.BAD_REQUEST).json({ message });
  }
  const user = await User.findOne({ email }).populate();
  if (!user) {
    return res
      .status(StatusCode.NOT_FOUND)
      .json({ message: "Email not found" });
  }
  user.password = undefined;
  res.json({ user: user });
};

export const getCurrentUser = async (req, res) => {
  console.log(req.user);
  
  const user = await User.findById(req.user.id).select("-password");

  // Kiểm tra xem người dùng có tồn tại không
  if (!user) {
    return res.status(StatusCode.NOT_FOUND).json({
      message: "User not foundd",
    });
  }

  // Trả về thông tin người dùng
  res.status(StatusCode.OK).json({
    user,
  });
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    console.log("user,decoded", user, decoded);

    console.log(!user || !user.refreshToken);

    if (!user || !user.refreshToken) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }

    // Tạo accessToken mới
    const newAccessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TIME_REFRESHTOKEN_EXPIRATION }
    );

    // Tạo refreshToken mới nếu cần
    const newRefreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET
    );

    user.refreshToken = newRefreshToken;
    await user.save();
    user.password = undefined;

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

export const logout = async (req, res) => {
  // Lấy token từ header Authorization
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(StatusCode.BAD_REQUEST)
      .json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);

    const userId = decoded.id;

    // Lấy thông tin người dùng từ cơ sở dữ liệu
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Xóa refresh token trong cơ sở dữ liệu (có thể lưu trữ refresh token trong cơ sở dữ liệu)
    user.refreshToken = undefined;
    await user.save();

    // Nếu bạn lưu token trong cookie, bạn có thể xóa cookie ở đây (tùy vào cách triển khai của bạn)
    // res.clearCookie("refresh_token", { httpOnly: true, secure: true });

    res.status(StatusCode.OK).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred during logout" });
  }
};
// export const updateUser = async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header

//     if (!token) {
//       return res
//         .status(StatusCode.UNAUTHORIZED)
//         .json({ message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       return res
//         .status(StatusCode.NOT_FOUND)
//         .json({ message: "User not found" });
//     }
//     const { error } = singupSchema.validate(req.body, {
//       abortEarly: false,
//     });

//     if (error) {
//       const message = error.details.map((err) => err.message);
//       return res.status(StatusCode.BAD_REQUEST).json({ message });
//     }

//     const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
//       new: true,
//     });

//     if (!updatedUser) {
//       return res
//         .status(StatusCode.NOT_FOUND)
//         .json({ message: "User not found" });
//     }

//     res.json({ user: updatedUser });
//     if (error) {
//       const message = error.details.map((err) => err.message);
//       return res.status(StatusCode.BAD_REQUEST).json({ message });
//     }
//   } catch (error) {
//     console.error("Error during update user:", error);
//     return res
//       .status(StatusCode.INTERNAL_SERVER_ERROR)
//       .json({ message: "An error occurred during update user" });
//   }
// };
export const updateUser = async (req, res) => {
  try {
    // Lấy token từ header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ message: "No token provided" });
    }

    // Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Tìm user theo ID từ token
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Validate dữ liệu nhập vào
    const { error } = updateUserSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const message = error.details.map((err) => err.message);
      return res.status(StatusCode.BAD_REQUEST).json({ message });
    }

    // Chỉ cập nhật các trường hợp lệ (không cập nhật email & password)
    const allowedUpdates = ["name", "gender"];
    const updateData = Object.keys(req.body)
      .filter((key) => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});

    // Kiểm tra nếu không có trường hợp lệ để cập nhật
    if (Object.keys(updateData).length === 0) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ message: "No valid fields to update" });
    }

    // Cập nhật thông tin người dùng
    const updatedUser = await User.findByIdAndUpdate(user._id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "User not found" });
    }

    res.json({ user: updatedUser });
  } catch (error) {
    console.error("Error during update user:", error);
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred during update user" });
  }
};


export const verify_code = async (req, res) => {
  try {
    res.status(200).send("verify_code");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("An error occurred while updating the user.");
  }
};
