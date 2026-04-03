const pool = require("../config/db");

const getAllCategories = async () => {
  const result = await pool.query("SELECT * FROM categories ORDER BY name");
  return result.rows;
};

module.exports = {
  getAllCategories,
};