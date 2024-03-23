const { Move, validate } = require("../models/moves");
const { Genre } = require("../models/genres");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const moves = await Move.find();
    res.status(200).send(moves);
  } catch (ex) {
    res.status(500).send(`${ex.reason}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const move = await Move.findById(req.params.id);
    if (!move)
      return res
        .status(404)
        .send(`move with id ${req.params.id} is not exsit.`);
    res.status(200).send(move);
  } catch (ex) {
    res.status(500).send(`${ex.reason}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("invalid genre");

    let move = new Move({
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    move = await move.save();
    res.status(201).send(move);
  } catch (ex) {
    res.status(500).send(`${ex.reason}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("invalid genre");

    const move = await Move.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      },
      {
        new: true,
      }
    );
    if (!move)
      return res
        .status(404)
        .send(`move with id ${req.params.id} is not exsit.`);

    res.status(200).send(move);
  } catch (ex) {
    res.status(500).send(`${ex.reason}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const move = await Move.findByIdAndRemove(req.params.id);
    if (!move)
      return res
        .status(404)
        .send(`move with id ${req.params.id} is not exsit.`);
    res.status(200).send(move);
  } catch (ex) {
    res.status(500).send(`${ex.reason}`);
  }
});

module.exports = router;
