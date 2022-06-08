const mongoose = require("mongoose");

const CastingsSchema = new mongoose.Schema({
  id_actor: { type: mongoose.Schema.Types.ObjectId, required: true },
  id_movie: { type: mongoose.Schema.Types.ObjectId, required: true },
  order: { type: String },
});

const CastingsModel = mongoose.model(
  "CastingsModel",
  CastingsSchema,
  "castingss"
);

module.exports = CastingsModel;
