const express = require("express");
const error = require("../middlewares/error");
const genres = require("../routes/genres");
const moves = require("../routes/moves");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/moves", moves);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
