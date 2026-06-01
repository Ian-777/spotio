const express = require("express");

const router = express.Router();

const {
  createReview,
  getReviews,
  getMyReview,
} = require("../controllers/reviewsController");

router.post(
  "/",
  createReview
);

router.get(
  "/:store_id/:user_id",
  getMyReview
);

router.get(
  "/:store_id",
  getReviews
);

module.exports = router;