const express = require("express");
const router = express.Router();
const CastingModel = require("../models/castings");
module.exports = router;
const id_user = "629f485825c978cfea8b715b";

router.get("/:id", async function (req, res) {
  try {
    const id_movie = req.params["id"];
    const casting = await CastingModel.find(
      {
        id_movie: id_movie,
      },
      null,
      { sort: { order: 1 } }
    );
    res.send(casting.map((a) => a.id_actor));
    console.log(casting);
  } catch (error) {
    console.log(error);
  }
});
