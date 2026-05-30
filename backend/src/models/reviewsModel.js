const pool = require("../config/db");

const addReview = async ({
  user_id,
  store_id,
  comment,
}) => {
  const query = `
    INSERT INTO reviews (
      user_id,
      store_id,
      comment
    )
    VALUES ($1, $2, $3)

    RETURNING *;
  `;

  const values = [
    user_id,
    store_id,
    comment,
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];
};

const getStoreReviews = async (
  store_id
) => {
  const query = `
    SELECT
      reviews.review_id,
      reviews.comment,
      reviews.created_at,

      users.user_id,
      users.name

    FROM reviews

    JOIN users
      ON reviews.user_id =
      users.user_id

    WHERE reviews.store_id = $1

    ORDER BY reviews.created_at DESC;
  `;

  const result = await pool.query(
    query,
    [store_id]
  );

  return result.rows;
};

module.exports = {
  addReview,
  getStoreReviews,
};