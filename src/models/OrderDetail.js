import mongoose, { Schema } from "mongoose";

const orderDetailSchema = new Schema(
  {
    order_id:{
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    product_id:{
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity:{
      type: Number,
      // required: true,
      default: 1,
    },
    price:{
      type: Number,
      // required: true,
    }
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("OrderDetail", orderDetailSchema);
