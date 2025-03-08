import mongoose, { Schema } from "mongoose";

const paymentMethodSchema = new Schema(
  {
    method_name:{
      type: String,
      required: true,
      unique: true,
    }
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("PaymentMethod", paymentMethodSchema);
