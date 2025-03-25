import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connection from "./config/db.js";
import rootRouter from "./routers/index.routers.js";
import bodyParser from "body-parser";
import ViewRouter from "./routers/ViewRouter.js";
import ProductRouter from "./routers/ProductRouter.js";
import { create } from "express-handlebars";
import { fileURLToPath } from "url";
import path from "path";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

// Load biến môi trường từ .env
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME || "localhost";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Khai báo thư mục chứa file tĩnh (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));
console.log("Static files served from:", path.join(__dirname, "public"));

// Cấu hình Express Handlebars
const hbs = create({
  partialsDir: path.join(__dirname, "views/partials"),
  helpers: {
    eq: (a, b) => a === b,
    gt: (a, b) => a > b, // Kiểm tra a > b
    lt: (a, b) => a < b, // Kiểm tra a < b
    add: (a, b) => a + b, // Cộng hai số
    subtract: (a, b) => a - b, // Trừ hai số
    ternary: (condition, value1, value2) => (condition ? value1 : value2),
    inputdata: (value, newValue) => value(...newValue),
    times: function (n, block) {
      let result = "";
      for (let i = 0; i < n; i++) {
        result += block.fn(i);
      }
      return result;
    },
    formatCurrency: (value) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    range: (start, end) => {
      let arr = [];
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    },
    json: (context) => JSON.stringify(context),
  },
});

// Khai báo thư mục chứa file tĩnh (CSS, JS, images)
app.use("/images", express.static(path.join(__dirname, "public/images")));
console.log("Static files served from:", path.join(__dirname, "./public"));

// Middleware
const jsonParser = express.json();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use((req, res, next) => {
  console.log("Content-Type:", req.headers["content-type"]);
  next();
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);

app.use(
  cors({
    origin: "http://192.168.1.17:8081",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/view", ViewRouter);
app.use("/api/v1", rootRouter);
app.use("/products", ProductRouter);

// Khởi động server
(async () => {
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`Server is running at http://${hostname}:${port}`);
    });
  } catch (error) {
    console.error(" Failed to connect to server:", error);
  }
})();
