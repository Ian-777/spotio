const pool = require("../config/db");

// Obtener barrios por localidad
const getNeighborhoodsByLocality = async (locality_id) => {
  const result = await pool.query(
    "SELECT * FROM neighborhoods WHERE locality_id = $1 ORDER BY name",
    [locality_id]
  );
  return result.rows;
};

module.exports = {
  getNeighborhoodsByLocality,
};