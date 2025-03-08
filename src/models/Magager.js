import mongoose, { Schema } from "mongoose";

const managerSchema = new Schema(
  {
    manager_id:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    }
  },
  { timestamps: false, versionKey: false,_id: false }
);

export default mongoose.model("Manager", managerSchema);
