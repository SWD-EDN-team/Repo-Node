import Seller from "../models/Seller.js";
import User from "../models/User.js";

export const acceptSeller = async (req, res)=>{
  try{
    const {user_id} = req.user.id;
    const seller = await Seller.findById(seller_id);
    if(!seller) return res.status(404).json({message: 'Seller not found'});
    seller.verify = true;
    await Seller.findByIdAndUpdate(seller_id,seller)
    const user = await User.findById(seller_id)
    if(!user) return res.status(404).json({message: 'User not found'});
    user.role = "seller"
    await User.findByIdAndUpdate(seller_id,{user})
    res.status(200).json({message: "verification successful"})
  }catch(err){
    res.status(500).json({message: err.message})
  }
}