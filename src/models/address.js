import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    user:{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Address", addressSchema);
