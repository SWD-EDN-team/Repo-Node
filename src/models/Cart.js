import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        min: 1
      },
      selected_size: {
        type: String,
        enum: ["S", "M", "L", "XL"]
      },
      selected_color: {
        type: String
      }
    }
  ],
  total_price: {
    type: Number
  }
}, { timestamps: true });


export default mongoose.model("Cart", cartSchema);