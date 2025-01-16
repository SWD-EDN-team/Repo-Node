require("dotenv").config();
const express = require("express");
const app = express();
const configViewEngine = require("./src/config/viewEngine");

const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME || "localhost";

// config template engine
configViewEngine(app);

app.get("/", (req, res) => {
  res.render("sample");
});

// khái báo routers

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
