const express = require("express");
const router = express.Router();
const RatingModel = require("../models/ratings");
const MovieModel = require("../models/movies");
module.exports = router;
const id_user = "629f485825c978cfea8b715b";

router.get("/:id", async function (req, res) {
  try {
    const id_movie = req.params["id"];
    const movie = await MovieModel.findOne({ id_tmdb: id_movie });
    if (movie != null) {
      const rating = await RatingModel.findOne({
        id_user: id_user,
        id_movie: movie._id,
      });
      if (rating == null) {
        res.send("0");
      } else {
        res.send("" + rating["rating"]);
      }
    } else {
      res.send("0");
    }
  } catch (error) {
    console.log(error);
  }
});

// router.get("/", async function (req, res) {
//   try {
//     const id_movie = req.body.id_movie;
//     const rating = await RatingModel.findOne({
//       id_user: id_user,
//       id_movie: id_movie,
//     });
//     res.send(rating);
//     console.log(rating);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/:id", async function (req, res) {
  // Your code !
  // Create a new rating instance
  try {
    const rate = req.body.rating;
    console.log("rating=" + rate);
    const movie = await MovieModel.findOne({ id_tmdb: req.params["id"] });
    if (movie != null) {
      console.log("movie._id=" + movie._id);
      const rating = await RatingModel.findOne({
        id_user: id_user,
        id_movie: movie._id,
      });
      if (rating == null) {
        const newRating = new RatingModel({
          // Rating attributes
          id_movie: movie._id,
          id_user: id_user,
          rating: rate,
        });
        // Save the movie in database
        const createdRating = await newRating.save();
        res.send("" + rate);
      }
    } else {
      res.send("0");
    }
  } catch (error) {
    // What to do if there was an error !
    console.error(error);
    res.send("0");
    // if (error.code === 11000) {
    //   res.status(400).json({
    //     message: `Movie with url "${req.body.url}" already exists`,
    //   });
    // } else {
    //   res.status(500).json({ message: "Error while creating the movie" });
    // }
  }
});

router.put("/:id", async function (req, res) {
  // La syntaxe :id veut simplement dire que cette route est dynamique et que la partie :id sera enfaite remplacée par l’id du film stocké en base de données.
  try {
    const newDoc = await RatingModel.findOneAndUpdate(
      { id_user: id_user, id_movie: req.params["id"] },
      {
        id_movie: req.params["id"],
        id_user: id_user,
        rating: req.body.rating,
      },
      { new: true }
    );
    res.send("ok");
    console.log(newDoc);
  } catch (error) {
    console.log(error);
  }
});
