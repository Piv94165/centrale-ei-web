const express = require("express");
const router = express.Router();
const RatingModel = require("../models/ratings");
module.exports = router;

router.get("/onemovie/:id", async function (req, res) {
  try {
    const id_movie = req.params["id"];
    const id_user = req.body.id_user;
    const rating = await RatingModel.findOne({
      id_user: id_user,
      id_movie: id_movie,
    });
    res.send(rating);
    console.log(rating);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async function (req, res) {
  try {
    const id_movie = req.body.id_movie;
    const id_user = req.body.id_user;
    const rating = await RatingModel.findOne({
      id_user: id_user,
      id_movie: id_movie,
    });
    res.send(rating);
    console.log(rating);
  } catch (error) {
    console.log(error);
  }
});

router.post("/onemovie/:id", async function (req, res) {
  // Your code !
  // Create a new rating instance
  try {
    const newRating = new RatingModel({
      // Rating attributes
      id_movie: req.params["id"],
      id_user: req.body.id_user,
      rating: req.body.rating,
    });
    // Save the movie in database
    const createdRating = await newRating.save();
    res.send(createdRating);
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

router.put("/onemovie/:id", async function (req, res) {
  // La syntaxe :id veut simplement dire que cette route est dynamique et que la partie :id sera enfaite remplacée par l’id du film stocké en base de données.
  try {
    const newDoc = await RatingModel.findOneAndUpdate(
      { _id: req.params["id"] },
      {
        id_movie: req.params["id"],
        id_user: req.body.id_user,
        rating: req.body.rating,
      },
      { new: true }
    );
    res.send(newDoc);
    console.log(newDoc);
  } catch (error) {
    console.log(error);
  }
});
