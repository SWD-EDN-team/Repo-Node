import Order from "../models/Order.js";
import OrderDetail from "../models/OrderDetail.js";
import Product from "../models/Product.js";

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