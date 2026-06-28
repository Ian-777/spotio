const {
  addReview,
  updateReview,
  getUserReview,
  getStoreReviews,
  deleteReview,
} = require("../models/reviewsModel");

const {
  addPhoto,
} = require("../models/photosModel");

const createReview = async (
  req,
  res
) => {
  try {
    const {
      user_id,
      store_id,
      comment,
    } = req.body;

    const existingReview =
      await getUserReview(
        user_id,
        store_id
      );

    let review;

    if (existingReview) {
      review =
        await updateReview({
          user_id,
          store_id,
          comment,
        });
    } else {
      review =
        await addReview({
          user_id,
          store_id,
          comment,
        });
    }

    if (req.file) {
      const image_url = `/uploads/${req.file.filename}`;

      await addPhoto({
        user_id,
        store_id,
        review_id:
          review.review_id,
        image_url,
      });
    }

    res.status(201).json(review);

  } catch (error) {
    console.error(
      "========== ERROR CREATE REVIEW =========="
    );

    console.error(error);

    console.error(error.stack);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getReviews = async (
  req,
  res
) => {
  try {
    const { store_id } =
      req.params;

    const reviews =
      await getStoreReviews(
        store_id
      );

    res.json(reviews);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error al obtener reseñas",
    });
  }
};

const getMyReview = async (
  req,
  res
) => {
  try {
    const {
      user_id,
      store_id,
    } = req.params;

    const review =
      await getUserReview(
        user_id,
        store_id
      );

    res.json(review || null);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error al obtener reseña del usuario",
    });
  }
};

const removeReview = async (
  req,
  res
) => {
  try {
    const {
      user_id,
      store_id,
    } = req.params;

    const review =
      await deleteReview(
        user_id,
        store_id
      );

    res.json(review);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error al eliminar reseña",
    });
  }
};

module.exports = {
  createReview,
  getReviews,
  getMyReview,
  removeReview,
};