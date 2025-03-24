import mongoose from "mongoose";
const { Schema } = mongoose;

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
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
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
      match: /^\+?\d{1,3}?\s?(\(\d{1,4}\))?\s?\d{3,4}-?\d{4}$/,
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
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
