import User from "../models/User.js";
import Address from "../models/address.js";
import jwt from "jsonwebtoken";

export const getAddress = async (req, res) => {
  try {
    const address = await Address.find().populate("user");
    if (!address) res.status(404).json({ message: "Address not found" });
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAddressbyId = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) res.status(404).json({ message: "Address not found" });
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAddressbyUser = async (req, res) => {
  try {
    const address = await Address.find({ user: req.user.id });
    if (!address) res.status(404).json({ message: "Address not found" });
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createAddress = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header

    if (!token) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const newAddress = new Address(req.body);
    newAddress.user = decoded.id;
    const savedAddress = await newAddress.save();

    user.address.push(savedAddress._id); 
    await user.save();
    res.status(200).json({ message: "Address added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateAddress = async (req, res) => {
  try {
    // Lấy token từ header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kiểm tra xem người dùng có sở hữu address này hay không
    if (!user.address.some((address) => address.equals(req.params.id))) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this address" });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAddress) res.status(404).json({ message: "Address not found" });
    res.status(200).json({ message: "Address updated successfull" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    // Lấy token từ header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    if (!user.address.some((address) => address.equals(req.params.id))) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this address" });
    }

    // Xóa địa chỉ khỏi bảng Address
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);
    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Xóa ObjectId khỏi mảng address của user
    user.address = user.address.filter((addr) => !addr.equals(req.params.id));
    await user.save();
    res.status(200).json({ message: "Address deleted successfull" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
