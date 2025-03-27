import dotenv from "dotenv";
import Order from "../models/Order.js";
import moment from "moment";

dotenv.config();

const apiGetPaid = process.env.API_GET_BANK;
const bankId = process.env.BANK_ID;
const accountNo = process.env.ACCOUNT_NO;

export const checkPaid = async (req, res) => {
  try {
    const { total, des } = req.query;
    console.log("tôtal", total);
    console.log("des", des);

    if (!des || isNaN(total)) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin mô tả hoặc giá trị thanh toán",
      });
    }

    const response = await fetch(apiGetPaid);

    console.log("res", response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const transactions = await response.json();
    console.log("Danh sách giao dịch:", transactions);

    if (!Array.isArray(transactions) || transactions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không có dữ liệu giao dịch",
      });
    }

    const isPaid = transactions.some(
      (item) =>
        item["Mô tả"].includes(des) && parseInt(item["Giá trị"]) >= total
    );

    if (!isPaid) {
      console.log(
        `Không tìm thấy giao dịch với mô tả: ${des} và giá trị: ${total}`
      );
    } else {
      const order = await Order.findOne({
        total_price: total,
        orderCart_id: des,
      });
      order.order_status = "Completed";
      console.log(">>>>>", order);
      await order.save();
      return true;
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra thanh toán:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau",
    });
  }
};

export const reOpenPayment = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.session.user._id;

    const booking = await BookingTable.findById(bookingId)
      .populate("table")
      .populate("customer")
      .exec();
    console.log("Đơn đặt bàn:", booking);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn đặt bàn",
      });
    }

    if (userId.toString() !== booking.customer._id.toString()) {
      return res.redirect("/");
    }

    const moment = require("moment");
    require("moment/locale/vi");

    const orderDate = moment.utc(booking.orderDate);
    const formattedBooking = {
      ...booking.toObject(),
      orderDay: orderDate
        .format("dddd")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      orderDate: orderDate.format("DD/MM/YYYY"),
      orderTime: orderDate.format("HH:mm"),
    };

    return res.render("payment", {
      bookingTable: formattedBooking,
      amount: booking.table.depositPrice,
      bankId,
      accountNo,
    });
  } catch (error) {
    console.error("Lỗi khi mở lại thanh toán:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau",
    });
  }
};

export const paymentOrder = async (req, resp) => {
  const orderId = req.params.orderId;
  try {
    const order = await OrderFood.findById(orderId)
      .populate("dishes.menuItem")
      .populate("table")
      .populate("bookingTable");

    if (!order) {
      return resp.status(404).json({ error: "Order not found." });
    }

    if (order.statusPayment === "Paid") {
      return resp
        .status(400)
        .json({ error: "This order has already been paid." });
    }

    const totalAmount = order.dishes.reduce(
      (total, dish) => total + dish.menuItem.price * dish.quantity,
      0
    );

    const paymentDetails = {
      amount: totalAmount,
      bankId,
      accountNo,
      orderId,
    };

    order.statusPayment = "Paid";
    await order.save();

    return resp.render("payment", {
      paymentDetails,
      order,
    });
  } catch (error) {
    return resp.status(500).json({ error: error.message });
  }
};
