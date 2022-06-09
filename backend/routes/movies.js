const express = require("express");
const router = express.Router();
const MovieModel = require("../models/movies");
module.exports = router;

router.get("/", async function (req, res) {
  try {
    const movies_list = await MovieModel.find({});
    console.log(movies_list);
    res.json(movies_list);
  } catch (error) {
    console.log(error);
  }
});

router.get("/genre/:genre", async function (req, res) {
  try {
    const genreName = req.params.genre
    const movies_list = await MovieModel.find({genre: genreName});
    res.json(movies_list);
  } catch (error) {
    console.log(error);
  }
});

router.post("/new", async function (req, res) {
  // Your code !
  // Create a new movie instance
  try {
    const newMovie = new MovieModel({
      // Movie attributes
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      viewers: req.body.viewers,
      date: req.body.date,
      genre: req.body.genre,
      popularity: req.body.popularity,
      runtime: req.body.runtime,
    });
    // Save the movie in database
    const createdMovie = await newMovie.save();
    res.send(createdMovie);
  } catch (error) {
    // What to do if there was an error !
    console.error(error);
    if (error.code === 11000) {
      res.status(400).json({
        message: `Movie with url "${req.body.url}" already exists`,
      });
    } else {
      res.status(500).json({ message: "Error while creating the movie" });
    }
  }
});

router.put("/:id", async function (req, res) {
  // La syntaxe :id veut simplement dire que cette route est dynamique et que la partie :id sera enfaite remplacée par l’id du film stocké en base de données.
  try {
    console.log(req.params);
    const id_movie = req.params["id"];
    const newDoc = await MovieModel.findOneAndUpdate(
      { _id: id_movie },
      {
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        viewers: req.body.viewers,
      },
      { new: true }
    );
    res.send([]);
    console.log(newDoc);
  } catch (error) {
    console.log(error);
  }
});
