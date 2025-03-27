import Seller from "../models/Seller.js";
import User from "../models/User.js";

export const acceptSeller = async (req, res)=>{
  try{
    const {seller_id} = req.params
    const seller = await Seller.findOne({seller_id});
    if(!seller) return res.status(404).json({message: 'Seller not found'});
    const user = await User.findById(seller_id)
    if(!user) return res.status(404).json({message: 'User not found'});
    const updatenSeller = await Seller.findByIdAndUpdate(seller._id,{verify:true}, { new: true })
    const updatenUser = await User.findByIdAndUpdate(seller_id,{role: "seller"}, { new: true })
    res.status(200).json({message: "verification successful",updatenSeller,updatenUser})
  }catch(err){
    res.status(500).json({message: err.message})
  }
}
export const getRequestBecomeSeller = async (req,res) => {
  try{
    const sellers = await Seller.find({verify: false})
    res.status(200).json(sellers)
  }catch(err){
    res.status(500).json({message: err.message})
  }
}