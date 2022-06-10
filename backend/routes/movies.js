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

router.get("/popularity", async function (req, res) {
  try {
    const movies_list = await MovieModel.find({});
    const popularity_list = [];
    for (const movie of movies_list) {
      popularity_list.push({ popularity: movie.popularity, movie: movie });
    }
    const orderedlist = popularity_list.sort(function (a, b) {
      return a.popularity > b.popularity
        ? -1
        : a.popularity == b.popularity
        ? 0
        : 1;
    });
    let popular_movies = [];
    let count = 0;
    for (const movie of orderedlist) {
      if (count < 20) {
        popular_movies.push(movie);
        count = count + 1;
      }
    }
    console.log(movies_list);
    res.json(movies_list);
  } catch (error) {
    console.log(error);
  }
});

router.get("/toprated", async function (req, res) {
  try {
    const movies_list = await MovieModel.find({});
    const toprated_list = [];
    for (const movie of movies_list) {
      toprated_list.push({ vote_average: movie.vote_average, movie: movie });
    }
    const orderedlist = toprated_list.sort(function (a, b) {
      return a.vote_average > b.vote_average
        ? -1
        : a.vote_average == b.vote_average
        ? 0
        : 1;
    });
    let toprated_movies = [];
    let count = 0;
    for (const movie of orderedlist) {
      if (count < 20) {
        toprated_movies.push(movie);
        count = count + 1;
      }
    }
    console.log(movies_list);
    res.json(movies_list);
  } catch (error) {
    console.log(error);
  }
});

router.get("/genre/:genre", async function (req, res) {
  try {
    const genreName = req.params.genre;
    const movies_list = await MovieModel.find({ genre: genreName });
    res.json(movies_list);
  } catch (error) {
    console.log(error);
  }
});

router.post("/new", async function (req, res) {
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
