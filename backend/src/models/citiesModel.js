const pool = require("../config/db");

// Obtener todas las ciudades
const getAllCities = async () => {
  const result = await pool.query("SELECT * FROM cities ORDER BY name");
  return result.rows;
};

module.exports = {
  getAllCities,
};