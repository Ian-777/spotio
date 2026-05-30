const {
  addReview,
  getStoreReviews,
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
    } = req.body;

    const review =
      await addReview({
        user_id,
        store_id,
        comment,
      });

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

module.exports = {
  createReview,
  getReviews,
};