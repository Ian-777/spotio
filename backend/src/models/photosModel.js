const pool = require("../config/db");

const addPhoto = async ({
  user_id,
  store_id,
  review_id = null,
  image_url,
}) => {
  const query = `
    INSERT INTO photos (
      user_id,
      store_id,
      review_id,
      image_url
    )
    VALUES ($1, $2, $3, $4)

    RETURNING *;
  `;

  const values = [
    user_id,
    store_id,
    review_id,
    image_url,
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];
};

const getStorePhotos = async (
  store_id
) => {
  const query = `
    SELECT
      photos.photo_id,
      photos.image_url,
      photos.created_at,

      users.user_id,
      users.name

    FROM photos

    JOIN users
      ON photos.user_id = users.user_id

    WHERE photos.store_id = $1
      AND photos.review_id IS NULL

    ORDER BY photos.created_at DESC;
  `;

  const result = await pool.query(
    query,
    [store_id]
  );

  return result.rows;
};

const getPhotosByReview =
  async (review_id) => {
    const query = `
      SELECT
        photo_id,
        review_id,
        image_url,
        created_at

      FROM photos

      WHERE review_id = $1

      ORDER BY created_at ASC;
    `;

    const result =
      await pool.query(
        query,
        [review_id]
      );

    return result.rows;
  };

const updatePhotoReview =
  async (
    photo_id,
    review_id
  ) => {
    const query = `
      UPDATE photos

      SET review_id = $2

      WHERE photo_id = $1

      RETURNING *;
    `;

    const result =
      await pool.query(
        query,
        [
          photo_id,
          review_id,
        ]
      );

    return result.rows[0];
  };

const deletePhoto = async (
  photo_id,
  user_id
) => {
  const query = `
    DELETE FROM photos

    WHERE photo_id = $1
      AND user_id = $2

    RETURNING *;
  `;

  const result = await pool.query(
    query,
    [photo_id, user_id]
  );

  return result.rows[0];
};

module.exports = {
  addPhoto,
  getStorePhotos,
  getPhotosByReview,
  updatePhotoReview,
  deletePhoto,
};