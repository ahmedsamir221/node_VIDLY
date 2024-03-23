const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtSecret")
  );
};

const User = mongoose.model("user", userSchema);

const joiUserSchema = Joi.object({
  name: Joi.string().required().min(1).max(50),
  email: Joi.string().required().min(1).max(50).email(),
  password: Joi.string().required().min(5).max(255),
});

function validate(user) {
  return joiUserSchema.validate(user);
}

module.exports.User = User;
module.exports.validate = validate;
