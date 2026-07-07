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

const updateReview = async ({
  user_id,
  store_id,
  comment,
}) => {
  const query = `
    UPDATE reviews

    SET
      comment = $3,
      created_at = NOW()

    WHERE user_id = $1
      AND store_id = $2

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
  store_id,
  user_id
) => {
  const reviewsQuery = `
  SELECT
    reviews.review_id,
    reviews.comment,
    reviews.created_at,

    users.user_id,
    users.name,

    COUNT(DISTINCT review_likes.like_id)::INTEGER
      AS likes,

    EXISTS (
      SELECT 1
      FROM review_likes rl
      WHERE rl.review_id = reviews.review_id
        AND rl.user_id = $2
    ) AS liked

  FROM reviews

  JOIN users
    ON reviews.user_id = users.user_id

  LEFT JOIN review_likes
    ON reviews.review_id =
       review_likes.review_id

  WHERE reviews.store_id = $1

  GROUP BY
    reviews.review_id,
    users.user_id

  ORDER BY reviews.created_at DESC;
`;

  const reviewsResult =
  await pool.query(
    reviewsQuery,
    [
      store_id,
      user_id,
    ]
  );

  const reviews =
    reviewsResult.rows;

  for (const review of reviews) {
    const photosQuery = `
      SELECT
        photo_id,
        image_url,
        created_at

      FROM photos

      WHERE review_id = $1

      ORDER BY created_at ASC;
    `;

    const photosResult =
      await pool.query(
        photosQuery,
        [review.review_id]
      );

    review.photos =
      photosResult.rows;
  }

  return reviews;
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

const addLike = async (
  review_id,
  user_id
) => {
  const query = `
    INSERT INTO review_likes (
      review_id,
      user_id
    )

    VALUES ($1, $2)

    RETURNING *;
  `;

  const result = await pool.query(
    query,
    [
      review_id,
      user_id,
    ]
  );

  return result.rows[0];
};

const removeLike = async (
  review_id,
  user_id
) => {
  const query = `
    DELETE FROM review_likes

    WHERE review_id = $1
      AND user_id = $2

    RETURNING *;
  `;

  const result = await pool.query(
    query,
    [
      review_id,
      user_id,
    ]
  );

  return result.rows[0];
};

const getLikesByReview = async (
  review_id
) => {
  const query = `
    SELECT COUNT(*)::INTEGER AS total

    FROM review_likes

    WHERE review_id = $1;
  `;

  const result = await pool.query(
    query,
    [review_id]
  );

  return result.rows[0].total;
};

module.exports = {
  addReview,
  updateReview,
  getUserReview,
  getStoreReviews,
  deleteReview,

  addLike,
  removeLike,
  getLikesByReview,
};