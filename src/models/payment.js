import mongoose, { Schema } from "mongoose";

const paymentsSchema = new Schema({
  orderId: { type: Number, required: true },
  amount: { type: Schema.Types.Decimal128, required: true },
  method: {
    type: String,
    enum: ["Cash", "Credit Card", "Online"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed", "Refunded"],
    required: true,
  },
  paymentDate: { type: Date, default: Date.now },
});

export default mongoose.model("Payments", paymentsSchema);
