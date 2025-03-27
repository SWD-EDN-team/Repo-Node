import Seller from "../models/Seller";

export const acceptSeller = async (req, res)=>{
  try{
    const {seller_id} = req.params;
    const seller = await Seller.findById(seller_id);
    if(!seller) return res.status(404).json({message: 'Seller not found'});
    seller.verify = true;
    const updateSeller = await Seller.findByIdAndUpdate(seller_id,seller)
    const updateUser = await User.findByIdAndUpdate(seller_id,{})
    res.status(200).json({message: "verification successful",updateSeller})
  }catch(err){
    res.status(500).json({message: err.message})
  }
}