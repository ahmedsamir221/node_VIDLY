const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("unauthorized, token is missing");

  try {
    const user = jwt.verify(token, config.get("jwtSecret"));
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
};
