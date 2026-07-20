const pool = require("../config/db");


// =============================
// AGREGAR FAVORITO
// =============================
const addFavorite = async (
  user_id,
  store_id
) => {

  const query = `
    INSERT INTO favorites (
      user_id,
      store_id
    )

    VALUES ($1, $2)

    RETURNING *;
  `;


  const result = await pool.query(
    query,
    [
      user_id,
      store_id
    ]
  );


  return result.rows[0];

};




// =============================
// OBTENER FAVORITOS DEL USUARIO
// =============================
const getFavoritesByUser = async (
  user_id
) => {


  const query = `

    SELECT

      favorites.favorite_id,


      s.store_id,
      s.name,
      s.address,

      s.latitude,
      s.longitude,

      s.slug,


      sp.description,
      sp.phone,
      sp.whatsapp,
      sp.website,


      COALESCE(
        img.images,
        '[]'
      ) AS images,


      cat.name AS category_name,


      l.name AS locality_name,


      n.name AS neighborhood_name,


      COALESCE(
        ROUND(
          AVG(r.rating),
          1
        ),
        0
      ) AS average_rating,


      COUNT(r.rating)
      AS total_ratings



    FROM favorites



    JOIN stores s

      ON favorites.store_id =
      s.store_id



    LEFT JOIN store_profiles sp

      ON s.store_id =
      sp.store_id




    LEFT JOIN store_categories sc

      ON s.store_id =
      sc.store_id




    LEFT JOIN categories cat

      ON sc.category_id =
      cat.category_id




    LEFT JOIN localities l

      ON s.locality_id =
      l.locality_id




    LEFT JOIN neighborhoods n

      ON s.neighborhood_id =
      n.neighborhood_id




    LEFT JOIN ratings r

      ON s.store_id =
      r.store_id




    LEFT JOIN (

      SELECT

        store_id,


        JSONB_AGG(

          JSONB_BUILD_OBJECT(

            'image_url',
            image_url,


            'image_type',
            image_type,


            'is_primary',
            is_primary

          )

        ) AS images


      FROM store_images


      GROUP BY store_id


    ) img


      ON s.store_id =
      img.store_id




    WHERE favorites.user_id = $1



    GROUP BY

      favorites.favorite_id,

      s.store_id,

      s.name,

      s.address,

      s.latitude,

      s.longitude,

      s.slug,


      sp.description,

      sp.phone,

      sp.whatsapp,

      sp.website,


      img.images,


      cat.name,

      l.name,

      n.name



    ORDER BY

      favorites.created_at DESC;


  `;



  const result = await pool.query(
    query,
    [
      user_id
    ]
  );


  return result.rows;

};





// =============================
// ELIMINAR FAVORITO
// =============================
const removeFavorite = async (
  user_id,
  store_id
) => {


  const query = `

    DELETE FROM favorites

    WHERE user_id = $1

    AND store_id = $2;

  `;



  await pool.query(
    query,
    [
      user_id,
      store_id
    ]
  );

};





module.exports = {

  addFavorite,

  getFavoritesByUser,

  removeFavorite,

};