import mongoose, { Schema } from "mongoose";

const sellerSchema = new Schema(
  {
    seller_id:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true 
    },
    store_name:{
      type: String,
      required: true,
    },
    store_decription:{
      type: String,
    },
    store_banner:{
      type: String,
      default: "../upload/avatar.jpg",
    },
    store_address:{
      type: Schema.Types.ObjectId,
      ref: 'Address',
    },
    store_phone:{
      type: String,
      required: true,
    },
    verify:{
      type: Boolean,
      default: false,
    },
    requestDate:{
      type: Date,
    },
    Tax_Information:{
      type: String,
    },
    Identity_Verification:{
      type: String,
    }
  },
  { timestamps: false, versionKey: false }
);
const Seller = mongoose.models.Seller || mongoose.model("Seller", sellerSchema);
export default Seller;
