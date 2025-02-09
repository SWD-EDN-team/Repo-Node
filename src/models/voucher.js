import mongoose, { Schema } from "mongoose";

const voucherSchema = new Schema({
  code: { type: String, required: true },
  discount: { type: Number, required: true },
  description: {
    type: String,
    required: true,
  },
  expiredAt: { type: Date, required: true},
  isActive: { type: Boolean, required: true, default: true },
});
export default mongoose.model("Voucher", voucherSchema);