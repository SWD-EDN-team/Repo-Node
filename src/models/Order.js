import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    customer_id:{
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    }

  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Order", orderSchema);
