const config = require("config");

module.exports = function () {
  if (!config.get("jwtSecret")) {
    throw new Error("jwt secret is not found");
  }
};
