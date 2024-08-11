const express = require("express");
const removeHTTPHeader = require("../middleware/removeHTTPHeader");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const serverConfig = (app) => {
  app.use(express.urlencoded({ extended: true })); // для чтения из POST запросов req.body
  app.use(express.json()); // для чтения json из body
  app.use(express.static(path.join(__dirname, "public"))); // чтение папки static
  app.use(removeHTTPHeader); //удаление заголовка
  app.use(cookieParser()); // чтение кук
  app.use(morgan("dev")); // Логирование запросов на сервере
};

module.exports = serverConfig;
