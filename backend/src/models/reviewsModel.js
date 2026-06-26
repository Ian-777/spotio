const pool = require("../config/db");

const addReview = async ({
  user_id,
  store_id,
  comment,
  photo_id = null,
}) => {
  const query = `
    INSERT INTO reviews (
      user_id,
      store_id,
      comment,
      photo_id
    )
    VALUES ($1, $2, $3, $4)

    RETURNING *;
  `;

  const values = [
    user_id,
    store_id,
    comment,
    photo_id,
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];
};

const updateReview = async ({
  user_id,
  store_id,
  comment,
  photo_id = null,
}) => {
  const query = `
    UPDATE reviews

    SET
      comment = $3,
      photo_id = $4,
      created_at = NOW()

    WHERE user_id = $1
      AND store_id = $2

    RETURNING *;
  `;

  const values = [
    user_id,
    store_id,
    comment,
    photo_id,
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];
};

const getUserReview = async (
  user_id,
  store_id
) => {
  const query = `
    SELECT *

    FROM reviews

    WHERE user_id = $1
      AND store_id = $2;
  `;

  const result = await pool.query(
    query,
    [
      user_id,
      store_id,
    ]
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
      reviews.photo_id,

      photos.image_url,

      users.user_id,
      users.name

    FROM reviews

    JOIN users
      ON reviews.user_id = users.user_id

    LEFT JOIN photos
      ON reviews.photo_id = photos.photo_id

    WHERE reviews.store_id = $1

    ORDER BY reviews.created_at DESC;
  `;

  const result = await pool.query(
    query,
    [store_id]
  );

  return result.rows;
};

const deleteReview = async (
  user_id,
  store_id
) => {
  const query = `
    DELETE FROM reviews

    WHERE user_id = $1
      AND store_id = $2

    RETURNING *;
  `;

  const result = await pool.query(
    query,
    [
      user_id,
      store_id,
    ]
  );

  return result.rows[0];
};

module.exports = {
  addReview,
  updateReview,
  getUserReview,
  getStoreReviews,
  deleteReview,
};