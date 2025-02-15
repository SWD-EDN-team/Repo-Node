import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      minlength: 30,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      minlength: 30,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    avatar: {
      type: String,
      default: "../upload/avatar.jpg",
    },
    refreshToken: { type: String },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    phoneNumber: {
      type: String,
      match: /^\+\d{1,3}\s\(\d{3}\)\s\d{3}-\d{4}$/,
    },
    address: {
      type: [Schema.Types.ObjectId],
      ref: "Address",
    },
    voucher: {
      type: Schema.Types.ObjectId,
      ref: "Voucher",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("user", userSchema);

export default User;

//ok
