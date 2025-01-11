const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ĐÃ STARTINGs");
});

app.listen(3000, async () => {
  console.log("App listening on http://localhost:3000");
});
