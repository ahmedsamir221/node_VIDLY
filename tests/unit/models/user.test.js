const { User } = require("../../../models/users");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

describe("user.generateToken", () => {
  it("should return valid token", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const user = new User(payload);
    const token = user.generateToken();
    const decode = jwt.verify(token, config.get("jwtSecret"));
    expect(decode).toMatchObject(payload);
  });
});
