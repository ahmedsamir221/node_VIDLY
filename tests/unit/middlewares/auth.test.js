const auth = require("../../../middlewares/auth");
const { User } = require("../../../models/users");
const mongoose = require("mongoose");

describe("auth middleware", () => {
  it("should set req.user if the token is valid", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const token = new User(payload).generateToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();
    auth(req, res, next);
    expect(req.user).toMatchObject(payload);
  });
});
