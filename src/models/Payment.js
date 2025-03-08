import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    customer_id:{
      type: String,
      required: true,
      unique: true,
    },
    payment_date:{
      type: Date,
      required: true,
      default: Date.now(),
    },
    amount:{
      type: Number,
      required: true,
    },
    status_payment:{
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "paid", "rejected"],
    },
    payment_method:{
      type: Schema.Types.ObjectId,
      ref: 'PaymentMethod',
      required: true,
    }
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("payment", paymentSchema);
