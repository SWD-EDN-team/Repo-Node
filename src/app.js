import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import routerAuth from "./routers/auth.js";
import addressRouter from "./routers/addressRouter.js";
import voucherRouter from "./routers/voucherRouter.js";
import configViewEngine from "./config/viewEngine.js";
import connection from "./config/db.js";

const app = express();
dotenv.config();

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

app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  return res.send("Hello, world!");
});

// connect db
// connectDB(process.env.DB_URI)(
// connectDB(process.env.DB_URI)

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

// routes
app.use("/api/v1", routerAuth);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/voucher", voucherRouter);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
