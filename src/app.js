import express from 'express';
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors';
import routerAuth from './routers/auth.js'
import addressRouter from './routers/addressRouter.js';
import voucherRouter from './routers/voucherRouter.js'
import { connectDB } from './config/db.js';

const app = express();
dotenv.config()

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"))

// connect db
connectDB(process.env.DB_URI)
// connectDB(process.env.DB_URI)

// routes
app.use('/api/v1',routerAuth)
app.use('/api/v1/address',addressRouter)
app.use('/api/v1/voucher',voucherRouter)

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);