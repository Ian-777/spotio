const {
  addRating,
  updateRating,
  getUserRating,
  getStoreRating,
} = require("../models/ratingsModel");

const createRating = async (req, res) => {
  try {
    const {
      user_id,
      store_id,
      rating,
    } = req.body;

    const existingRating =
      await getUserRating(
        user_id,
        store_id
      );

    let result;

    if (existingRating) {
      result = await updateRating({
        user_id,
        store_id,
        rating,
      });
    } else {
      result = await addRating({
        user_id,
        store_id,
        rating,
      });
    }

    res.status(201).json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error al guardar rating",
    });
  }
};

const getRating = async (req, res) => {
  try {
    const { store_id } = req.params;

    const rating =
      await getStoreRating(store_id);

    res.json(rating);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error al obtener rating",
    });
  }
};

const getMyRating = async (
  req,
  res
) => {
  try {
    const {
      store_id,
      user_id,
    } = req.params;

    const rating =
      await getUserRating(
        user_id,
        store_id
      );

    res.json(rating || null);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error al obtener rating del usuario",
    });
  }
};

module.exports = {
  createRating,
  getRating,
  getMyRating,
};