const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genres");

const Move = mongoose.model(
  "move",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
      trim: true,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 250,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 250,
    },
  })
);

const moveSchema = Joi.object({
  title: Joi.string().required().min(5).max(50),
  genreId: Joi.string().required(),
  numberInStock: Joi.number().required().min(0).max(250),
  dailyRentalRate: Joi.number().required().min(0).max(250),
});

function validate(move) {
  return moveSchema.validate(move);
}

module.exports.Move = Move;
module.exports.validate = validate;
