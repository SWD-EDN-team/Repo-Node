import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    rate:{
      type: Number,
      min: 1,
      max: 5,
    },
    comment:{
      type: String,
      required: true,
    },
    user_id:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Review", reviewSchema);
