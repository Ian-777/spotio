const express = require("express");

const router = express.Router();

const {
  createRating,
  getRating,
  getMyRating,
} = require("../controllers/ratingsController");

router.post("/", createRating);

router.get("/:store_id", getRating);

router.get(
  "/:store_id/:user_id",
  getMyRating
);

module.exports = router;