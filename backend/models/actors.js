const mongoose = require("mongoose");

const ActorsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  popularity: { type: String },
  profile_path: { type: String },
});

const ActorsModel = mongoose.model("ActorsModel", ActorsSchema, "actors");

module.exports = ActorsModel;
