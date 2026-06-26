const {
  addReview,
  updateReview,
  getUserReview,
  getStoreReviews,
  deleteReview,
} = require("../models/reviewsModel");

const createReview = async (
  req,
  res
) => {
  try {
    const {
      user_id,
      store_id,
      comment,
      photo_id = null,
    } = req.body;

    const existingReview =
      await getUserReview(
        user_id,
        store_id
      );

    let review;

    if (existingReview) {
      review = await updateReview({
        user_id,
        store_id,
        comment,
        photo_id,
      });
    } else {
      review = await addReview({
        user_id,
        store_id,
        comment,
        photo_id,
      });
    }

    res.status(201).json(review);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error al guardar reseña",
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