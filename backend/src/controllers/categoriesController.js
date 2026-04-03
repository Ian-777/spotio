const categoriesModel = require("../models/categoriesModel");

const getCategories = async (req, res) => {
  try {
    const categories = await categoriesModel.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener categorías" });
  }
};

module.exports = {
  getCategories,
};