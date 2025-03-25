import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connection from "./config/db.js";
import rootRouter from "./routers/index.routers.js";
import bodyParser from "body-parser";
import ViewRouter from "./routers/ViewRouter.js";
import { create } from "express-handlebars";
import { fileURLToPath } from "url";
import path from "path";
import fileUpload from "express-fileupload";
import extendBlocks from "handlebars-extend-block";

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
  extname: ".hbs",
  helpers: {
    ...extendBlocks(create().handlebars), // Truyền instance của handlebars vào extendBlocks
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

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cấu hình CORS (chỉ định frontend nào được phép gọi API)
app.use(
  cors({
    origin: "http://192.168.1.17:8081",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});
// Routes
app.use("/view", ViewRouter);
app.use("/api/v1", rootRouter);

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
