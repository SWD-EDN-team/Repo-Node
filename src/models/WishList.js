import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
wishlistSchema.index({ user_id: 1 });
export default mongoose.model("Wishlist", wishlistSchema);
