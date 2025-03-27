import Order from "../models/Order.js";
import OrderDetail from "../models/OrderDetail.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

export const getAllOrdersDetail = async (req, res, next) => {
  try {
    const ordersDetail = await OrderDetail.find({});
    res.status(200).json(ordersDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// log data order details thong qua order_id (log product trong 1 order)
export const getOrderDetailByOrder = async (req, res) => {
  try {
    const {order_id} = await req.params
    const orderDetails = await OrderDetail.find({order_id})
    if (!orderDetails) {
      res.status(404).json({ message: "Order details not found" });
    }
    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const createOrderDetail = async (req, res) => {
  try {
    const { order_id, product_id, quantity, price } = req.body;
    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const orderDetail = new OrderDetail({ order_id, product_id, quantity });
    await orderDetail.save();

    res.status(201).json(orderDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getOrderDetailsBySeller = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({
        message: "Invalid seller ID",
        error: `Seller ID ${req.user.id} is not a valid ObjectId`,
      });
    }

    const orderDetails = await OrderDetail.find()
      .populate({
        path: "product_id",
        match: { seller_id: new mongoose.Types.ObjectId(req.user.id) },
        select: "seller_id",
      })
      .select("order_id product_id quantity price")
      .exec();

    const filteredOrderDetails = orderDetails.filter(
      (detail) => detail.product_id !== null
    );

    res.status(200).json(filteredOrderDetails);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Không thể lấy danh sách chi tiết đơn hàng",
      error: error.message,
    });
  }
};

export const viewOrderDetailsBySeller = async (req, res) => {
  console.log(req.seller);
  
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({
        message: "Invalid seller ID",
        error: `Seller ID ${req.user.id} is not a valid ObjectId`,
      });
    }

    const orderDetails = await OrderDetail.find()
      .populate({
        path: "product_id",
        match: { seller_id: new mongoose.Types.ObjectId(req.user.id) },
        // select: "seller_id quantity price",
      })
      // .select("order_id product_name quantity price")
      .exec();

    const filteredOrderDetails = orderDetails.filter(
      (detail) => detail.product_id !== null
    );

    console.log("orderDetails",filteredOrderDetails);
    
    res.render("manageOrder/manageOrder",{
      title:"Giới thiệu",
      layout:"sidebarDashboard",
      orderDetails: filteredOrderDetails,
    })
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Không thể lấy danh sách chi tiết đơn hàng",
      error: error.message,
    });
  }
};