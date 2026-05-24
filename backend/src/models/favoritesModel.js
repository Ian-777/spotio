const pool = require("../config/db");

const addFavorite = async (user_id, store_id) => {
  const query = `
    INSERT INTO favorites (user_id, store_id)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const result = await pool.query(query, [
    user_id,
    store_id,
  ]);

  return result.rows[0];
};

const getFavoritesByUser = async (user_id) => {
  const query = `
    SELECT
      favorites.favorite_id,
      stores.store_id,
      stores.name,
      stores.address,
      categories.name AS category_name,
      localities.name AS locality_name,
      neighborhoods.name AS neighborhood_name

    FROM favorites

    JOIN stores
      ON favorites.store_id = stores.store_id

    LEFT JOIN categories
      ON stores.category_id = categories.category_id

    LEFT JOIN localities
      ON stores.locality_id = localities.locality_id

    LEFT JOIN neighborhoods
      ON stores.neighborhood_id = neighborhoods.neighborhood_id

    WHERE favorites.user_id = $1

    ORDER BY favorites.created_at DESC;
  `;

  const result = await pool.query(query, [user_id]);

  return result.rows;
};

const removeFavorite = async (user_id, store_id) => {
  const query = `
    DELETE FROM favorites
    WHERE user_id = $1
    AND store_id = $2;
  `;

  await pool.query(query, [user_id, store_id]);
};

module.exports = {
  addFavorite,
  getFavoritesByUser,
  removeFavorite,
};