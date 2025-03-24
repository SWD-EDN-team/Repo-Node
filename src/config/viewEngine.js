import path from "path";
import express from "express";

const configViewEngine = (app) => {
  // console.log("__dirname", __dirname);

  app.set("views", path.join("./src", "views"));
  app.set("view engine", "ejs");
  // config static files
  app.use(express.static(path.join("./src", "public")));
};

export default configViewEngine;
