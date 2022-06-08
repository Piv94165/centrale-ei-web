const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  score: { type: String, required: true },
  id_user: { type: mongoose.Schema.Types.ObjectId, required: true },
  id_movie: { type: mongoose.Schema.Types.ObjectId, required: true },
});

ScoreSchema.index({ id_user: 1, id_movie: 1 }, { unique: true });

const ScoreModel = mongoose.model("Score", ScoreSchema, "Scores");

module.exports = ScoreModel;
