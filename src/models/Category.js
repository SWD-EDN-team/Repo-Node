import mongoose, { Schema } from "mongoose";

const caregorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image:{
      type: [String],
      required: true,
      default: 'default_category_image.jpg'
    }
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Category", caregorySchema);
