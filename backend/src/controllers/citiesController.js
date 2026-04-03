const citiesModel = require("../models/citiesModel");

// Controlador para obtener ciudades
const getCities = async (req, res) => {
  try {
    const cities = await citiesModel.getAllCities();
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener ciudades" });
  }
};

module.exports = {
  getCities,
};