const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const {
  uploadPhoto,
  getPhotos,
  removePhoto,
} = require("../controllers/photosController");

router.post(
  "/",
  upload.single("image"),
  uploadPhoto
);

router.get(
  "/:store_id",
  getPhotos
);

router.delete(
  "/:photo_id/:user_id",
  removePhoto
);

module.exports = router;