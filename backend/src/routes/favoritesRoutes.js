const express = require("express");

const router = express.Router();

const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("../controllers/favoritesController");

router.post("/", addFavorite);

router.get("/:user_id", getFavorites);

router.delete(
  "/:user_id/:store_id",
  removeFavorite
);

module.exports = router;