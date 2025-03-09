import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import routerAuth from "./routers/auth.js";
import addressRouter from "./routers/addressRouter.js";
import voucherRouter from "./routers/voucherRouter.js";
import { connectDB } from "./config/db.js";
import { create } from "express-handlebars";
import axios from "axios";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
dotenv.config();

const hbs = create({
  helpers: {
    eq: (a, b) => a === b,
    ternary: (condition, value1, value2) => (condition ? value1 : value2),
    inputdata: (value, newValue) => value(...newValue),
    times: function (n, block) {
      let result = "";
      for (let i = 0; i < n; i++) {
        result += block.fn(i);
      }
      return result;
    },
  },
});

// Định nghĩa __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Khai báo thư mục chứa file tĩnh (CSS, JS, images)
app.use(express.static(path.join(__dirname, "../public")));
console.log("Static files served from:", path.join(__dirname, "../public"));

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// connect db
connectDB(process.env.DB_URI);
// connectDB(process.env.DB_URI)

// routes
app.use("/api/v1", routerAuth);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/voucher", voucherRouter);

app.get("/detailProduct", (req, res) => {
  res.render("detailProduct", { title: "Giới thiệu", layout: "productPage" });
});

app.get("/detailProduct", (req, res) => {
  res.render("detailProduct", { title: "Giới thiệu", layout: "productPage" });
});

app.use("/manageAddress", (req, res) => {
  res.render("manageAddress/manageAddress", {
    title: "Giới thiệu",
    layout: "productPage",
  });
});

app.use("/myWishList", (req, res) => {
  res.render("myWishList/myWishList", {
    title: "Giới thiệu",
    layout: "productPage",
  });
});

app.use("/saveCard", (req, res) => {
  res.render("saveCard/saveCard", {
    title: "Giới thiệu",
    layout: "productPage",
  });
});


app.get("/home", (req, res) => {
  res.render("home/home", {  // Nếu file là views/home/home.handlebars
    title: "Trang chủ",
    products: [
        { name: "Roadstar", image: "https://www.vascara.com/uploads/cms_productmedia/2024/October/30/tui-xach-tay-basic-phoi-quai-doi---tot-0176---mau-be__78339__1730263321-medium@2x.jpg", description: "Printed Cotton T-Shirt", price: 38, oldPrice: 40 },
        { name: "Allen Solly", image: "https://www.vascara.com/uploads/cms_productmedia/2024/October/30/tui-xach-tay-basic-phoi-quai-doi---tot-0176---mau-be__78339__1730263321-medium@2x.jpg", description: "Women Textured Bag", price: 80, oldPrice: 100 },
        { name: "Louis Philippe", image: "https://www.vascara.com/uploads/cms_productmedia/2024/October/30/tui-xach-tay-basic-phoi-quai-doi---tot-0176---mau-be__78339__1730263321-medium@2x.jpg", description: "Polo Collar T-Shirt", price: 50, oldPrice: 65 },
        { name: "Adidas", image: "https://www.vascara.com/uploads/cms_productmedia/2024/October/30/tui-xach-tay-basic-phoi-quai-doi---tot-0176---mau-be__78339__1730263321-medium@2x.jpg", description: "Men Running Shoes", price: 60, oldPrice: 75 },
        { name: "Trendyol", image: "https://www.vascara.com/uploads/cms_productmedia/2024/October/30/tui-xach-tay-basic-phoi-quai-doi---tot-0176---mau-be__78339__1730263321-medium@2x.jpg", description: "Floral Embroidered Dress", price: 35, oldPrice: 45 },
        { name: "YK Disney", image: "https://www.vascara.com/uploads/cms_productmedia/2024/October/30/tui-xach-tay-basic-phoi-quai-doi---tot-0176---mau-be__78339__1730263321-medium@2x.jpg", description: "Girls Pink Moana Dress", price: 80, oldPrice: 100 },
        { name: "US Polo", image: "https://www.vascara.com/uploads/cms_productmedia/2024/October/30/tui-xach-tay-basic-phoi-quai-doi---tot-0176---mau-be__78339__1730263321-medium@2x.jpg", description: "Tailored Cotton Shirt", price: 40, oldPrice: 50 },
        { name: "Zyla", image: "https://www.vascara.com/uploads/cms_productmedia/2024/October/30/tui-xach-tay-basic-phoi-quai-doi---tot-0176---mau-be__78339__1730263321-medium@2x.jpg", description: "Women Sandals", price: 35, oldPrice: 40 }
    ],
    categories: [
      { name: "Casual Wear", image: "https://img.freepik.com/premium-photo/style-everyday-mens-casual-shirt-photoshoot-poses-boys-shirt_463958-96.jpg" },
      { name: "Western Wear", image: "https://img.freepik.com/premium-photo/style-everyday-mens-casual-shirt-photoshoot-poses-boys-shirt_463958-102.jpg?w=360" },
      { name: "Ethnic Wear", image: "https://img.freepik.com/premium-photo/style-everyday-mens-casual-shirt-photoshoot-poses-boys-shirt_463958-97.jpg?w=360" },
      { name: "Kids Wear", image: "https://images.squarespace-cdn.com/content/v1/555243eae4b08eb084d60440/1673714156665-XJ5S7LUMCI79VBRZ94LP/heron_017.jpg?format=500w" },
      { name: "Sports Wear", image: "https://images.squarespace-cdn.com/content/v1/555243eae4b08eb084d60440/1673714156665-XJ5S7LUMCI79VBRZ94LP/heron_017.jpg?format=500w" },
      { name: "Formal Wear", image: "https://images.squarespace-cdn.com/content/v1/555243eae4b08eb084d60440/1673714156665-XJ5S7LUMCI79VBRZ94LP/heron_017.jpg?format=500w" },
      { name: "Accessories", image: "https://images.squarespace-cdn.com/content/v1/555243eae4b08eb084d60440/1673714156665-XJ5S7LUMCI79VBRZ94LP/heron_017.jpg?format=500w" },
      { name: "Footwear", image: "https://images.squarespace-cdn.com/content/v1/555243eae4b08eb084d60440/1673714156665-XJ5S7LUMCI79VBRZ94LP/heron_017.jpg?format=500w" }
    ],
    ratings: [
      {
          name: "Leslie Alexander",
          role: "Model",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          review: "It is a long established fact that a reader will be distracted by readable content...",
          rating: 5
      },
      {
          name: "Jacob Jones",
          role: "Co-Founder",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
          review: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          rating: 4
      },
      {
          name: "Jenny Wilson",
          role: "Fashion Designer",
          image: "https://randomuser.me/api/portraits/women/68.jpg",
          review: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
          rating: 5
      }
    ]
  });
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
