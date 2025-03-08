import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const resetPasswordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resetString: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
});

resetPasswordSchema.pre("save", async function (next) {
  if (this.isModified("resetString")) {
    try {
      const hash = await bcrypt.hash(this.resetString, 8);
      this.resetString = hash;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

resetPasswordSchema.methods.compareToken = async function (resetString) {
  return await bcrypt.compare(resetString, this.resetString);
};

export default mongoose.model("ResetPassword", resetPasswordSchema);
