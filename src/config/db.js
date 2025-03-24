import dotenv from "dotenv";
dotenv.config();
// const mysql = require("mysql2/promise");
import mongoose from "mongoose";

// test connection
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT, // default là 3306
// });

// const connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT, // default là 3306
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

const dbState = [
  {
    value: 0,
    label: "disconnected",
  },
  {
    value: 1,
    label: "connected",
  },
  {
    value: 2,
    label: "connecting",
  },
  {
    value: 3,
    label: "disconnecting",
  },
];

const connection = async () => {
  console.log("Connecting to MongoDB...");
  const options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
  };

  try {
    await mongoose.connect(process.env.DB_HOST, options);
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find((f) => f.value === state).label, "to db");
    console.log("Connection successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

export default connection;
