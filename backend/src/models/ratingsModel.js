const pool = require("../config/db");

const addRating = async ({
  user_id,
  store_id,
  rating,
}) => {
  const query = `
    INSERT INTO ratings (
      user_id,
      store_id,
      rating
    )
    VALUES ($1, $2, $3)

    ON CONFLICT (user_id, store_id)

    DO UPDATE SET
      rating = EXCLUDED.rating

    RETURNING *
  `;

  const values = [
    user_id,
    store_id,
    rating,
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];
};

const getStoreRating = async (store_id) => {
  const query = `
    SELECT
      ROUND(AVG(rating), 1)
        AS average_rating,

      COUNT(*) AS total_ratings

    FROM ratings

    WHERE store_id = $1
  `;

  const result = await pool.query(query, [
    store_id,
  ]);

  return result.rows[0];
};

const getUserRating = async (
  user_id,
  store_id
) => {
  const query = `
    SELECT rating

    FROM ratings

    WHERE user_id = $1
    AND store_id = $2
  `;

  const values = [
    user_id,
    store_id,
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];
};

module.exports = {
  addRating,
  getStoreRating,
  getUserRating,
};