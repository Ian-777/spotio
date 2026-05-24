const favoritesModel = require("../models/favoritesModel");

const addFavorite = async (req, res) => {
  try {
    const { user_id, store_id } = req.body;

    const favorite =
      await favoritesModel.addFavorite(
        user_id,
        store_id
      );

    res.status(201).json(favorite);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error al agregar favorito",
    });
  }
};

const getFavorites = async (req, res) => {
  try {
    const { user_id } = req.params;

    const favorites =
      await favoritesModel.getFavoritesByUser(
        user_id
      );

    res.json(favorites);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error al obtener favoritos",
    });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { user_id, store_id } = req.params;

    await favoritesModel.removeFavorite(
      user_id,
      store_id
    );

    res.json({
      message: "Favorito eliminado",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error al eliminar favorito",
    });
  }
};

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
};