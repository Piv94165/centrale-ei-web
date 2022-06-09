const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  url: { type: String },
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
  date: { type: String },
  genre: [{ type: String }],
  popularity: { type: String },
  runtime: { type: String },
  id_tmdb: { type: String, required: true },
});

const MovieModel = mongoose.model("MovieModel", MovieSchema, "movies");

module.exports = MovieModel;
