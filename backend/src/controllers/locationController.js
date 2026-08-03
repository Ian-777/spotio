const axios = require("axios");

const searchAddress = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res
        .status(400)
        .json({
          message: "La dirección es requerida.",
        });
    }

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q,
          format: "jsonv2",
          addressdetails: 1,
          limit: 1,
        },
        headers: {
          "User-Agent":
            "Spotio/1.0 (contacto@spotio.app)",
        },
      }
    );

    if (!response.data.length) {
      return res.json(null);
    }

    const place = response.data[0];

    res.json({
      latitude: Number(place.lat),
      longitude: Number(place.lon),
      displayName: place.display_name,
      address: place.address,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Error al buscar la dirección.",
    });
  }
};

module.exports = {
  searchAddress,
};