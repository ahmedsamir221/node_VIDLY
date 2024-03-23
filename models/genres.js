const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  createdOn: { type: Date, default: Date.now },
});

const Genre = mongoose.model("genre", genreSchema);

const joiGenreSchema = Joi.object({
  name: Joi.string().required().min(5).max(50),
});

function validate(genre) {
  return joiGenreSchema.validate(genre);
}

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
module.exports.validate = validate;
