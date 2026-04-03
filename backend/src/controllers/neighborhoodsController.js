const neighborhoodsModel = require("../models/neighborhoodsModel");

const getNeighborhoods = async (req, res) => {
  try {
    const { locality_id } = req.params;

    const neighborhoods =
      await neighborhoodsModel.getNeighborhoodsByLocality(locality_id);

    res.json(neighborhoods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener barrios" });
  }
};

module.exports = {
  getNeighborhoods,
};