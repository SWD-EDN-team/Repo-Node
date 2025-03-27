import Cart from "../models/Cart.js";
import axios from "axios";
import User from "../models/User.js";
import Seller from "../models/Seller.js";
import {
  product,
  categories,
  productById,
  productpage,
  reviews,
  reviewById,
} from "../utils/api.js";
export const viewLogin = (req, res) => {
  res.render("login/login", { layout: "auth" });
};
export const viewSignup = (req, res) => {
  res.render("signup/signup", { layout: "auth" });
};
export const viewForgotPassword = (req, res) => {
  res.render("forgotPassword/forgot-password", { layout: "auth" });
};
export const viewOTP = async (req, res) => {
  const email = await req.email;
  console.log(email);

  res.render("otp/otp", { layout: "auth", email });
};
export const viewSuccessful = (req, res) => {
  res.render("successful/successful", { layout: "auth" });
};
const orders = [
  {
    img: "/assets/images/dress.png",
    name: "Girls Pink Moana Printed Dress",
    size: "S",
    qty: 1,
    price: 80,
    status: "Delivered",
    statusClass: "delivered",
    showReview: true,
  },
  {
    img: "/assets/images/dress.png",
    name: "Women Textured Handheld Bag",
    size: "Regular",
    qty: 1,
    price: 80,
    status: "In Process",
    statusClass: "in-process",
    showCancel: true,
  },
  {
    img: "/assets/images/dress.png",
    name: "Tailored Cotton Casual Shirt",
    size: "M",
    qty: 1,
    price: 40,
    status: "In Process",
    statusClass: "in-process",
    showCancel: true,
  },
];

export const viewMyOrder = (req, res) => {
  res.render("my-orders", { orders });
};
export const viewDetailProdct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = await productById(id);
    const reviewData = await reviewById(id);
    console.log("product", productData.data,reviewData.data);
    res.render("detailProduct/detailProduct", {
      title: "Chi tiết sản phẩm",
      layout: "main",
      product: productData.data,
      reviews: reviewData.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const viewManageAddress = (req, res) => {
  res.render("manageAddress/manageAddress", {
    title: "Giới thiệu",
    layout: "productPage",
  });
};
export const viewMyWishList = (req, res) => {
  res.render("myWishList/myWishList", {
    title: "Giới thiệu",
    layout: "productPage",
  });
};
export const viewSaveCard = (req, res) => {
  res.render("saveCard/saveCard", {
    title: "Giới thiệu",
    layout: "productPage",
  });
};
export const viewPayment = (req, res) => {
  res.render("payment/payment", {
    title: "Giới thiệu",
    layout: "main",
  });
};
export const viewAddProduct = async (req, res) => {
  try {
    const categories = await axios.get("http://localhost:8081/api/v1/category");
    console.log(categories.data);
    res.render("addProduct/addProduct", {
      title: "Giới thiệu",
      layout: "sidebarDashboard",
    });
  } catch (error) {
    console.log({ error: error.message });
  }
};
export const viewReview = async (req, res) => {
  try {
    const reviews = await axios.get(
      `http://localhost:8081/api/v1/review/${req.params.product_id}`
    );
    console.log(reviews.data);
    res.render("detailProduct/reviewProduct", {
      title: "Giới thiệu",
      layout: "main",
      reviews: reviews.data,
      helpers: {
        repeat: function (n, options) {
          let result = "";
          for (let i = 0; i < n; i++) {
            result += options.fn(i);
          }
          return result;
        },
      },
    });
  } catch (error) {
    console.log("loi");
  }
};
export const viewHome = async (req, res) => {
  try {
    const productData = await product();
    const reviewData = await reviews();
    const categoryData = await categories();
    const bestSellers = productData.data.slice(0, 8);
    const user = req.user || null; // Nếu chưa đăng nhập, user = null

    res.render("home/home", {
      title: "Trang chủ",
      products: bestSellers,
      ratings: reviewData.data,
      categories: categoryData.data,
      user,
      layout: "main",
    });
  } catch (error) {
    console.log(error);
  }
};

export const viewProductList = async (req, res) => {
  try {
    const page = req.params.pageNumber || 1; // Lấy số trang từ URL, mặc định là trang 1
    const response = await productpage(page); // Gọi API lấy sản phẩm theo trang
    const categoryData = await categories();
    // Lấy danh sách colors và sizes không trùng lặp & đếm số lượng
    const colorCount = {};
    const sizeCount = {};

    response.data.products.forEach((product) => {
      product.color.forEach((color) => {
        if (color) {
          colorCount[color] = (colorCount[color] || 0) + 1;
        }
      });
      product.size.forEach((size) => {
        if (size) {
          sizeCount[size] = (sizeCount[size] || 0) + 1;
        }
      });
    });

    const colors = Object.keys(colorCount).map((color) => ({
      name: color,
      count: colorCount[color],
      code: getColorCode(color), // Hàm để lấy mã màu nếu có
    }));

    const sizes = Object.keys(sizeCount).map((size) => ({
      name: size,
      count: sizeCount[size],
    }));

    res.render("productList/productList", {
      title: "Danh sách sản phẩm",
      layout: "main",
      products: response.data.products, // API trả về danh sách sản phẩm
      categories: categoryData.data,
      colors: colors,
      sizes: sizes,
      currentPage: response.data.currentPage, // Trang hiện tại
      totalPages: response.data.totalPages, // Tổng số trang
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server");
  }
};

const getColorCode = (color) => {
  const colorMap = {
    Red: "#FF0000",
    Blue: "#0000FF",
    Green: "#008000",
    Black: "#000000",
    White: "#FFFFFF",
  };
  return colorMap[color] || "#CCCCCC";
};

export const viewCart = async (req, res) => {
  try {
    // Lấy dữ liệu giỏ hàng trực tiếp
    const cartData = await Cart.findOne({ user_id: req.user.id })
      .populate({
        path: "items.product_id",
        model: "Product",
        select: "product_name price image",
      })
      .populate("user_id", "name email")
      .lean();
    if (!cartData) {
      return res.render("cart/cart", {
        title: "Giỏ hàng",
        cart: null,
        layout: "productPage",
      });
    }

    res.render("cart/cart", {
      title: "Giỏ hàng",
      cart: cartData,
      layout: "productPage",
    });
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng:", error);
    res.status(500).send("Lỗi server");
  }
};

export const viewManageProduct = async (req, res) => {
  try {
    const product = await axios.get("http://localhost:8081/api/v1/product");
    console.log(product.data);
    res.render("manageProduct/manageProduct", {
      title: "Giới thiệu",
      layout: "sidebarDashboard",
    });
  } catch (e) {
    console.log(e);
  }
};

export const viewManageOrder = async (req, res) => {
  res.render("manageOrder/manageOrder", {
    title: "Giới thiệu",
    layout: "sidebarDashboard",
  });
};
export const viewManageReview = async (req, res) => {
  try {
    const reviews = await axios.get("http://localhost:8081/api/v1/review");
    console.log(reviews.data);
    res.render("manageReview/manageReview", {
      title: "Giới thiệu",
      layout: "sidebarDashboard",
      reviews: reviews.data,
      helpers: {
        repeat: function (n, options) {
          let result = "";
          for (let i = 0; i < n; i++) {
            result += options.fn(i);
          }
          return result;
        },
      },
    });
  } catch (error) {
    console.log("loi");
  }
};

export const viewShippingAddress = async (req, res) => {
  const city = [
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cần Thơ",
    "Cao Bằng",
    "Đà Nẵng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Nội",
    "Hà Tĩnh",
    "Hải Dương",
    "Hải Phòng",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "TP. Hồ Chí Minh",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
  ];
  try {
    const response = await axios.get(
      "http://localhost:8081/api/v1/address/current",
      {
        headers: { Authorization: `Bearer ${req.token}` },
      }
    );
    console.log(response.data);
    res.render("shippingAddress/shippingAddress", {
      title: "Giới thiệu",
      layout: "main",
      shippingAddress: response.data,
      city,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching shipping address" });
  }
};

export const viewProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await User.findById(userId)
      .select("-password -refreshToken")
      .populate("address")
      .exec();

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.render("profile/profile", {
      title: "Trang cá nhân",
      user: userData.toObject({ getters: true }),
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
