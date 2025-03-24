import mongoose, { Schema } from "mongoose";

const sellerSchema = new Schema(
  {
    seller_id:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    store_name:{
      type: String,
      required: true,
    },
    store_address:{
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
    store_phone:{
      type: String,
      required: true,
    },
    verify:{
      type: Boolean,
      default: false,
    }
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Seller", sellerSchema);
