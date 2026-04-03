const pool = require("../config/db");

// Obtener localidades por ciudad
const getLocalitiesByCity = async (city_id) => {
  const result = await pool.query(
    "SELECT * FROM localities WHERE city_id = $1 ORDER BY name",
    [city_id]
  );
  return result.rows;
};

module.exports = {
  getLocalitiesByCity,
};