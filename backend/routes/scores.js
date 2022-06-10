const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const ScoreModel = require("../models/scores");
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
      scores_list.push([s.score, s.id_movie]);
    }
    console.log("score : " + scores_list);
    res.json(scores_list);
  } catch (error) {
    console.log(error);
    res.send("nok");
  }
});
