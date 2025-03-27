import Joi from "joi";
import StatusCode from "http-status-codes";
import User from "../models/User.js";
import Seller from "../models/Seller.js";

const createSellerSchema = Joi.object({
  store_name: Joi.required().messages({
    "any.required": "store_name is required",
  }),
  store_address: Joi.required().messages({
    "any.required": "store_address is required",
  }),
  store_phone: Joi.string().messages({
      "string.empty": "store_phone is not empty",
  }),
})

export const createSeller = async (req, res) => {
  try {
    const seller = await Seller.findOne({seller_id:req.user.id})
    if(seller){
      return res.status(StatusCode.CONFLICT).json({message: "Seller already exists"});
    }
    const newSeller = new Seller({...req.body,seller_id:req.user.id,requestDate:Date.now()});
    await newSeller.save();
    
    res.status(201).json(newSeller);
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
export const verifySeller = async (req, res) => {
  try{
    const seller_id = req.params.seller_id;
    const seller = await Seller.findOne({seller_id});
    if(!seller){
      return res.status(StatusCode.NOT_FOUND).json({message: "Seller not found"});
    }
    seller.verify =true;
    const updatedSeller = await Seller.findByIdAndUpdate(seller._id,seller,{new: true});
    res.status(StatusCode.OK).json({message: "Seller verified", updatedSeller});
  }catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message: error.message});
  }
}
export const removeSellerVerify = async (req, res) => {
  try{
    const seller_id = req.params.seller_id;
    const seller = await Seller.findOneAndDelete({seller_id});
    if(!seller){
      return res.status(StatusCode.NOT_FOUND).json({message: "Seller not found"});
    }
    res.status(StatusCode.OK).json({message: "Seller verified removed", seller});
  }catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message: error.message});
  }
}
export const getSellerVerify = async (req, res) => {
  try {
    const seller = await Seller.find({verify:false}).populate("seller_id");
    if(!seller){
      return res.status(StatusCode.NOT_FOUND).json({message: "Seller not found"});
    }
    res.status(StatusCode.OK).json(seller);
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message: error.message});
  }
}

export const getAllSellerAccounts = async (req, res) => {
  try {
    const seller = await Seller.find({verify:true}).populate("seller_id");
    if(!seller){
      return res.status(StatusCode.NOT_FOUND).json({message: "Seller not found"});
    }
    res.status(StatusCode.OK).json(seller);
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message: error.message});
  }
}
export const ViewAllSellerAccount = async (req, res) => {
  try {
    const sellers = await Seller.find({verify:true}).populate("seller_id");
    if(!sellers){
      return res.status(StatusCode.NOT_FOUND).json({message: "Seller not found"});
    }
    const plainSellers = sellers.map(seller => seller.toObject ? seller.toObject() : seller);

    res.render("adminManager/pending",{
      title: "handle Pending seller",
      layout:"adminManager",
      sellers: plainSellers
    })
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({message: error.message});
  }
}
export const viewSellerRequest = async (req,res)=>{
  try {
    const sellers = await Seller.find({verify:false}).populate("seller_id").sort({ requestDate: -1 })
    console.log(sellers);
    const plainSellers = sellers.map(seller => seller.toObject ? seller.toObject() : seller);
    res.render("adminManager/seller",{
      title: "handle Pending seller",
      layout:"adminManager",
      sellers: plainSellers
    })
  } catch (error) {
    console.error( error.message);
            alert("send faild: " + (error.response?.data?.message || error.message))
  }
}


export const uploadAvatar = async (req, res) => {
  if (!req.files || !req.files.avatar) {
      return res.status(400).json({ success: false, error: "Không có file nào được tải lên!" });
  }
  try {
      // Gửi file vào hàm upload
      const fileObject = req.files.avatar;
      const uploadResult = await uploadSingleFile(fileObject);

      if (uploadResult.status !== "success") {
          return res.status(500).json({ success: false, error: uploadResult.error });
      }
      const seller = await Seller.findOne({seller_id:req.user.id})
      await Seller.findByIdAndUpdate(seller._id, { store_banner: uploadResult.path });

      res.json({ success: true, avatarPath: uploadResult.path });
  } catch (error) {
      console.error("Lỗi khi upload avatar:", error);
      res.status(500).json({ success: false, error: "Lỗi máy chủ khi tải ảnh lên." });
  }
};