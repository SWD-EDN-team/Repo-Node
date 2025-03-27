import User from "../models/User.js";
import StatusCode from "http-status-codes";
import Manager from "../models/Manager.js"
import bcryptjs from "bcryptjs";

export const createManager = async (req,res) =>{
  try {
    const { email, password, name } = req.body; //lấy dữ liệu
    console.log(email, password, name);
    
    if(!email || !password || !name ) return res.status(400).json({message:"field required"})
      const  exitUser = await User.findOne({ email: email})
      if (exitUser) {
      return res.status(StatusCode.CONFLICT).json({
        message: "Email already exists",
      });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ email, password:hashPassword, name, role: "manager" ,verified: true});
    await newUser.save();
    const newManger = new Manager({manager_id:newUser._id})
    await newManger.save()
    return res.status(201).json({ message: "Manager created successfully" });
  } catch (error) {
    console.error("Error creating manager:", error);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred during signup manager. Please try again later.",
    });
  }
}

