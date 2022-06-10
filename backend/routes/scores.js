const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const ScoreModel = require("../models/scores");
const MovieModel = require("../models/movies");
module.exports = router;
const id_user = "629f485825c978cfea8b715b";

router.get("/", async function (req, res) {
  try {
    const score = await ScoreModel.find({
      id_user: id_user, //new mongoose.Schema.Types.ObjectId(id_user),
    });
    // .setOptions({ sort: { score: -1 } })
    // .limit(20)
    // .exec();
    // res.send(score["score"]);

    const scores_list = [];
    for (const s of score) {
      scores_list.push({ score: s.score, id_movie: s.id_movie });
    }
    // console.log("score : " + scores_list);
    // var mylist = [
    //   [1, "c"],
    //   [3, "a"],
    //   [5, "b"],
    // ];
    const orderedlist = scores_list.sort(function (a, b) {
      return a.score > b.score ? -1 : a.score == b.score ? 0 : 1;
    });
    let best_movies = [];
    let count = 0;
    for (const movie of orderedlist) {
      if (count < 20) {
        const themoviedb = await MovieModel.findOne({ _id: movie.id_movie });
        best_movies.push(themoviedb);
        count = count + 1;
      }
    }
    console.log(best_movies);
    // const orderedlist = scores_list.sort(function (a, b) {
    //   return a[1].localeCompare(b[1]);
    // });
    // console.log("score ordonné : " + best_movies);
    res.json(best_movies);
  } catch (error) {
    console.log(error);
    res.send("nok");
  }
});
