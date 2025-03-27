import Order from "../models/Order.js"
import OrderDetail from "../models/OrderDetail.js"

// get order for administration
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("customer_id")
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// get order for customers
export const getCurrentOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.user.id)
    console.log("hello" , req.user.id);
    
    if (!order) return res.status(404).json({ message: "Order not found" })
    res.status(200).json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// create order for customers
export const createOrder = async (req, res, next) => {
  try {
    const order = new Order({
      customer_id: req.user.id,
      shipping_address: req.body.shipping_address,
    })

    await order.save()
    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const createOrderFormCart = async (req, res) => {
  try {
    const { product_ids } = await req.body; // Changed to product_ids (plural) to expect an array
    console.log(product_ids);

    // Create new order with customer_id
    const order = new Order({ customer_id: req.user.id });

    // Check if product_ids is an array and has items
    if (!Array.isArray(product_ids) || product_ids.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }

    // Create order details for each product_id
    const orderDetailsPromises = product_ids.map(product_id => {
      const newOrderDetail = new OrderDetail({
        order_id: order._id,
        product_id: product_id
      });
      return newOrderDetail.save();
    });

    // Wait for all order details to be saved
    await Promise.all(orderDetailsPromises);
    await order.save();

    res.status(201).json({ message: "Order created successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Quy trình order người dùng chọn product từ wishlist, Cart, product
// Cần nhận product_id
export const createOrderFormCartV2 = async (req, res) => {
  try {
    const { productList } = await req.body;
    console.log(productList);
    const order = new Order({ customer_id: req.user.id });
    await order.save();

    const orderDetailsPromises = productList.map(product => {
      const newOrderDetail = new OrderDetail({
        order_id: order._id,
        product_id: product.product_id,
        quantity: product.quantity,
        price: product.price,
      });
      return newOrderDetail.save();
    });

    // Wait for all order details to be saved
    const savedOrderDetails = await Promise.all(orderDetailsPromises);

    res.status(201).json({ message: "Order created successfully",savedOrderDetails });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};