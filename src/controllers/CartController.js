import Joi from "joi";
import StatusCode from "http-status-codes";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const cartSchema = Joi.object({
  product_id: Joi.string().required().messages({
    "any.required": "product name is required",
    "string.empty": "product name is not empty",
  }),
  quantity: Joi.number().min(1).required().messages({
    "any.required": "quantity is required",
    "number.min": "Quantity must be at least 1",
  }),
})

export const getCartbyToken = async (req, res) =>{
  try {
    const cart = await Cart.findOne({ user_id: req.user.id })
    .populate({
      path: "items.product_id",
      model: "Product", // Đảm bảo đúng model của Product
      select: "name price image", // Chỉ lấy thông tin cần thiết
    })
    .populate("user_id", "name email"); // Lấy thông tin user nếu cần

  if (!cart) {
    return res.status(StatusCode.NOT_FOUND).json({ message: "Cart not found" });
  }
    res.status(StatusCode.OK).json({ message: "Get all cart in cart with token" ,cart});
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
// export const getAllCart = async (req, res) =>{
//   try {
//     const cart = await Cart.find();
//     res.status(StatusCode.OK).json({ message: "Get all products in cart" ,Cart});
//   } catch (error) {
//     res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
//   }
// }
export const createCart = async (req, res) =>{
  try {
    const { error } = cartSchema.validate(req.body);
    if (error) {
      const message = error.details.map((err) => err.message);
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
    const cart = new Cart({...req.body, user_id: req.user.id});
    await cart.save();
    res.status(StatusCode.CREATED).json(cart);
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}

export const addToCart = async (req, res) => {
  try {
    const { product_id, quantity, selected_size, selected_color, total_price } = req.body;

    // Kiểm tra xem sản phẩm có tồn tại không
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user_id: req.user._id }); 

    if (!cart) {
      // Nếu chưa có giỏ hàng, tạo mới
      cart = new Cart({
        user_id: req.user.id,
        items: [{ product_id, quantity, selected_size, selected_color }],
        total_price: total_price,
      });
    } else {
      // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.product_id.toString() === product_id &&
          item.selected_size === selected_size &&
          item.selected_color === selected_color
      );

      if (itemIndex > -1) {
        // Nếu sản phẩm đã có, cập nhật số lượng
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Nếu chưa có, thêm mới vào mảng `items`
        cart.items.push({ product_id, quantity, selected_size, selected_color });
      }

      // Cập nhật tổng giá trị giỏ hàng
      cart.total_price += product.price * quantity;
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};