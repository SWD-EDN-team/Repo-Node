import mongoose,{Schema} from 'mongoose';

const userSchema = new Schema({
    email :{
      type: String,
      required: true,
      unique: true,
    },
    password:{
      type: String,
      required: true,
      minLenght: 6,
      maxlenght: 30,
    },
    name:{
      type: String,
      required: true,
      minLenght:3,
      maxlenght:30,
    },
    role:{
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    avatar:{
      type: String,
      default: '../upload/avatar.jpg',
    },
    refreshToken: { type: String },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default:'male',
    },
    phoneNumber: {
      type: String,
      match: /^\+\d{1,3}\s\(\d{3}\)\s\d{3}-\d{4}$/
    },
    address: {
       type: [Schema.Types.ObjectId], ref: "Address" 
    },
    voucher: {
       type: Schema.Types.ObjectId, ref: "Voucher"
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'active'
    }
},{timestamps: true,versionKey: false })

export default mongoose.model("User", userSchema);