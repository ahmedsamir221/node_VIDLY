const { User } = require("../models/users");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("invalid email or password");

    const isPsswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPsswordValid)
      return res.status(400).send("invalid email or password");

    const token = user.generateToken();

    res.status(200).send(token);
  } catch (ex) {
    res.status(500).send(`${ex.reason}`);
  }
});

const joiAuthSchema = Joi.object({
  email: Joi.string().required().min(1).max(50).email(),
  password: Joi.string().required().min(5).max(255),
});

function validate(auth) {
  return joiAuthSchema.validate(auth);
}

module.exports = router;
