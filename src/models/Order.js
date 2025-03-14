import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    order_status: {
      type: String,
      enum: ["Pending", "Canceled", "Completed"],
      default: "Pending",
    },
    payment_id: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
    shipping_address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Order", orderSchema);
