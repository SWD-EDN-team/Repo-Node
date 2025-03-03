import express from 'express';
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors';
import routerAuth from './routers/auth.js'
import addressRouter from './routers/AddressRouter.js';
import voucherRouter from './routers/VoucherRouter.js';
import SellerRouter from './routers/SellerRouter.js';
import ProductRouter from './routers/ProductRouter.js';
import CategoryRouter from './routers/CategoryRouter.js';
import ReviewRouter from './routers/ReviewRouter.js';
import CartRoutter from './routers/CartRouter.js';
import WishlistRouter from './routers/WishlistRouter.js'
import { connectDB } from './config/db.js';
import { create } from "express-handlebars";
import axios from "axios";
import { fileURLToPath } from "url";
import path from "path";


const app = express();
dotenv.config()

const hbs = create({
  helpers: {
    eq:  (a, b) => a === b,
    ternary: (condition, value1, value2) => (condition ? value1 : value2),
    inputdata: (value,newValue) => value(...newValue)
  },
});

// Định nghĩa __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Khai báo thư mục chứa file tĩnh (CSS, JS, images)
app.use(express.static(path.join(__dirname, "../src/public/")));
console.log("Static files served from:", path.join(__dirname, "../src/public/"));

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"))
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// connect db
connectDB(process.env.DB_URI)
// connectDB(process.env.DB_URI)


// routes
app.use('/api/v1',routerAuth)
app.use('/api/v1/address',addressRouter)
app.use('/api/v1/voucher',voucherRouter)
app.use('/api/v1/seller',SellerRouter)
app.use('/api/v1/product',ProductRouter)
app.use('/api/v1/category',CategoryRouter)
app.use('/api/v1/review',ReviewRouter)
app.use('/api/v1/cart',CartRoutter)
app.use('/api/v1/wishlist',WishlistRouter)
app.use('/view', (req, res) =>{
  res.render('home/home')
})

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);