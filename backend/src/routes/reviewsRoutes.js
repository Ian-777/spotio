const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const {
  createReview,
  getReviews,
  getMyReview,
  removeReview,
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

module.exports = router;