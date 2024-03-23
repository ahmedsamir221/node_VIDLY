const validateObjectId = require("../middlewares/validateObjectId");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const { Genre, validate } = require("../models/genres");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const genres = await Genre.find();
  res.status(200).send(genres);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send(`genre with id ${req.params.id} is not exsit.`);
  res.status(200).send(genre);
});

router.post("/", auth, async (req, res) => {
  try {
    const result = validate({ name: req.body.name });
    if (result.error) return res.status(400).send(result.error.message);

    let genre = new Genre({
      name: req.body.name,
    });
    genre = await genre.save();
    res.status(201).send(genre);
  } catch (ex) {
    res.status(500).send(`${ex.reason}`);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const result = validate({ name: req.body.name });
    if (result.error) return res.status(400).send(result.error.message);

    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!genre)
      return res
        .status(404)
        .send(`genre with id ${req.params.id} is not exsit.`);

    res.status(200).send(genre);
  } catch (ex) {
    res.status(500).send(`${ex.reason}`);
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre)
      return res
        .status(404)
        .send(`genre with id ${req.params.id} is not exsit.`);
    res.status(200).send(genre);
  } catch (ex) {
    res.status(500).send(`${ex.reason}`);
  }
});

module.exports = router;
