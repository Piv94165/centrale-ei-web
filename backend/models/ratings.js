const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  rating: { type: String, required: true },
  id_user: { type: mongoose.Schema.Types.ObjectId, required: true },
  id_movie: { type: mongoose.Schema.Types.ObjectId, required: true },
});

RatingSchema.index({ id_user: 1, id_movie: 1 }, { unique: true });

const RatingModel = mongoose.model("Rating", RatingSchema, "ratings");

module.exports = RatingModel;
