const storesModel = require("../models/storesModel");

const searchStores = async (req, res) => {
  try {
    let { city_id, locality_id, neighborhood_id, category_id } = req.query;

    // Convertir a números (evitar strings)
    city_id = city_id ? Number(city_id) : undefined;
    locality_id = locality_id ? Number(locality_id) : undefined;
    category_id = category_id ? Number(category_id) : undefined;

    // Manejo especial de neighborhood_id
    if (neighborhood_id === "null") {
      neighborhood_id = null;
    } else if (neighborhood_id) {
      neighborhood_id = Number(neighborhood_id);
    } else {
      neighborhood_id = undefined;
    }

    // DEBUG (puedes quitarlo después)
    console.log({
      city_id,
      locality_id,
      neighborhood_id,
      category_id,
    });

    const stores = await storesModel.searchStores({
      city_id,
      locality_id,
      neighborhood_id,
      category_id,
    });

    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al buscar establecimientos" });
  }
};

module.exports = {
  searchStores,
};