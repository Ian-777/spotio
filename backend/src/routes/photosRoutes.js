const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const {
  uploadPhoto,
  getPhotos,
  getReviewPhotos,
  linkPhotoToReview,
  removePhoto,
} = require("../controllers/photosController");

router.post(
  "/",
  upload.single("image"),
  uploadPhoto
);

router.get(
  "/store/:store_id",
  getPhotos
);

router.get(
  "/review/:review_id",
  getReviewPhotos
);

router.put(
  "/:photo_id/review",
  linkPhotoToReview
);

router.delete(
  "/:photo_id/:user_id",
  removePhoto
);

module.exports = router;