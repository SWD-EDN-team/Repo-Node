import mongoose, { Schema } from "mongoose";
// add thêm các thuộc tích để kiểm tra bị block và đếm ngược thời gian quay lại sử dụng

const customerSchema = new Schema(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Customer", customerSchema);
