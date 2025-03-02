import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import routerAuth from "./routers/authRouter.js";
import connection from "./config/db.js";
import rootRouter from "./routers/index.routers.js";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine.js";
import addressRouter from "./routers/addressRouter.js";
import voucherRouter from "./routers/voucherRouter.js";
import { create } from "express-handlebars";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
dotenv.config();

var jsonParser = bodyParser.json();

// Định nghĩa __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("__dirname>>>>>>>", __dirname);

const hbs = create({
  helpers: {
    eq: (a, b) => a === b,
    ternary: (condition, value1, value2) => (condition ? value1 : value2),
  },
});

// Khai báo thư mục chứa file tĩnh (CSS, JS, images)
app.use(express.static(path.join(__dirname, "./public")));

console.log("Static files served from:", path.join(__dirname, "./public"));

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../src/views"));

const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME || "localhost";

// config file upload
// app.use(fileUpload());

// configViewEngine(app);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);
app.use(cors());

app.use(
  cors({
    origin: "http://192.168.1.17:8081",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.get("/", (req, res) => {
  res.render("my-orders");
});

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

app.get("/my-orders", (req, res) => {
  res.render("my-orders", { orders });
});

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routerAuth);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/voucher", voucherRouter);

app.use("/v1/api", rootRouter);

(async () => {
  try {
    await connection();

    app.listen(port, hostname, () => {
      console.log(`Backend zero app listening on port ${port}`);
    });
  } catch (error) {
    console.log("Failed connecting to server", error);
  }
})();
