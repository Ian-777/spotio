const localitiesModel = require("../models/localitiesModel");

const getLocalities = async (req, res) => {
  try {
    const { city_id } = req.params;

    const localities = await localitiesModel.getLocalitiesByCity(city_id);

    res.json(localities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener localidades" });
  }
};

module.exports = {
  getLocalities,
};