import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      min: 1,
      max: 5,
    },
    stoke_quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: [String],
      default: "../upload/avatar.jpg",
    },
    seller_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Seller",
    },
    discount: {
      type: Number,
      default: 0,
    },
    color: {
      type: [String], 
      required: true,
    },
    size: {
      type: [
        {
          type: String,
          enum: ["S", "M", "L", "XL"], 
        },
      ],
      required: true,
    },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Product", productSchema);
