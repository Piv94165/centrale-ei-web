const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, unique: true },
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
  date: { type: String },
  genre: { type: String },
  popularity: { type: String },
  runtime: { type: String },
});

const MovieModel = mongoose.model("MovieModel", MovieSchema, "movies");

module.exports = MovieModel;
