import mongoose, { Schema } from "mongoose";

const managerSchema = new Schema(
  {
    manager_id:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true 
    }
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Manager", managerSchema);
