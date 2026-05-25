const pool = require("../config/db");

const searchStores = async ({
  city_id,
  locality_id,
  neighborhood_id,
  category_id,
}) => {
  let query = `
    SELECT 
      s.*,

      c.name AS city_name,

      l.name AS locality_name,

      n.name AS neighborhood_name,

      cat.name AS category_name,

      ROUND(
        AVG(r.rating),
        1
      ) AS average_rating,

      COUNT(r.rating)
        AS total_ratings

    FROM stores s

    JOIN cities c
      ON s.city_id = c.city_id

    JOIN localities l
      ON s.locality_id = l.locality_id

    LEFT JOIN neighborhoods n
      ON s.neighborhood_id = n.neighborhood_id

    JOIN categories cat
      ON s.category_id = cat.category_id

    LEFT JOIN ratings r
      ON s.store_id = r.store_id

    WHERE 1=1
  `;

  const values = [];

  if (city_id) {
    values.push(city_id);

    query += `
      AND s.city_id = $${values.length}
    `;
  }

  if (locality_id) {
    values.push(locality_id);

    query += `
      AND s.locality_id = $${values.length}
    `;
  }

  if (neighborhood_id !== undefined) {
    if (neighborhood_id === null) {
      query += `
        AND s.neighborhood_id IS NULL
      `;
    } else {
      values.push(neighborhood_id);

      query += `
        AND s.neighborhood_id = $${values.length}
      `;
    }
  }

  if (category_id) {
    values.push(category_id);

    query += `
      AND s.category_id = $${values.length}
    `;
  }

  query += `
    GROUP BY
      s.store_id,
      c.name,
      l.name,
      n.name,
      cat.name

    ORDER BY s.name
  `;

  const result = await pool.query(
    query,
    values
  );

  return result.rows;
};

module.exports = {
  searchStores,
};