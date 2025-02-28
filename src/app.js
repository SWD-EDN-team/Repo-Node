import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import routerAuth from "./routers/authRouter.js";
import addressRouter from "./routers/addressRouter.js";
import voucherRouter from "./routers/voucherRouter.js";
import connection from "./config/db.js";
import rootRouter from "./routers/index.routers.js";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine.js";
const app = express();
dotenv.config();

var jsonParser = bodyParser.json();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME || "localhost";
// config file upload
// app.use(fileUpload());

// config template engine
configViewEngine(app);

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
  res.render("homePage.ejs");
});

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routerAuth);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/voucher", voucherRouter);

app.use("/v1/api", rootRouter);

(async () => {
  try {
    // USING MONGOOSE
    await connection();

    app.listen(port, hostname, () => {
      console.log(`Backend zero app listening on port ${port}`);
    });
  } catch (error) {
    console.log("Failed connecting to server", error);
  }
})();
