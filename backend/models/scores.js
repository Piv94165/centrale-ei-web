const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  score: { type: String, required: true },
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "UserModel",
  },
  id_movie: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "MovieModel",
  },
});

ScoreSchema.index({ id_user: 1, id_movie: 1 }, { unique: true });

const ScoreModel = mongoose.model("Score", ScoreSchema, "scores");

module.exports = ScoreModel;
