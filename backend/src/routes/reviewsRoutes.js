const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const {
  createReview,
  getReviews,
  getMyReview,
  removeReview,

  likeReview,
  unlikeReview,
  getLikes,
} = require("../controllers/reviewsController");

router.post(
  "/",
  upload.single("image"),
  createReview
);

router.delete(
  "/:store_id/:user_id",
  removeReview
);

router.get(
  "/:store_id/:user_id",
  getMyReview
);

router.get(
  "/:store_id",
  getReviews
);

router.post(
  "/like",
  likeReview
);

router.delete(
  "/like",
  unlikeReview
);

router.get(
  "/likes/:review_id",
  getLikes
);

module.exports = router;