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

      sp.description,

JSONB_BUILD_OBJECT(
  'phone', sp.phone,
  'whatsapp', sp.whatsapp,
  'whatsapp_url',
    CASE 
      WHEN sp.whatsapp IS NOT NULL
      THEN 'https://wa.me/57' || sp.whatsapp
      ELSE NULL
    END,
  'email', sp.email,
  'website', sp.website
) AS contact,

sp.price_level,
sp.is_verified,
sp.is_featured,

      COALESCE(
        img.images,
        '[]'::jsonb
      ) AS images,


      COALESCE(
  hrs.hours,
  '[]'::jsonb
) AS hours,

COALESCE(
  social.social_links,
  '[]'::jsonb
) AS social_links,


      c.name AS city_name,

      l.name AS locality_name,

      n.name AS neighborhood_name,

      cat.name AS category_name,

      sub.name AS subcategory_name,

      ARRAY_AGG(DISTINCT t.name)
        FILTER (WHERE t.name IS NOT NULL)
        AS tags,

      ROUND(
        r_avg.average_rating,
        1
      ) AS average_rating,

      r_avg.total_ratings

    FROM stores s


    LEFT JOIN store_profiles sp
      ON s.store_id = sp.store_id


    LEFT JOIN (
      SELECT
        store_id,

        JSONB_AGG(
          JSONB_BUILD_OBJECT(
            'image_url', image_url,
            'image_type', image_type,
            'is_primary', is_primary
          )
        ) AS images

      FROM store_images

      GROUP BY store_id

    ) img
      ON s.store_id = img.store_id


    LEFT JOIN (
  SELECT
    store_id,
    JSONB_AGG(
      JSONB_BUILD_OBJECT(
        'day_of_week', day_of_week,
        'open_time', open_time,
        'close_time', close_time,
        'is_closed', is_closed
      )
      ORDER BY day_of_week
    ) AS hours
  FROM store_hours
  GROUP BY store_id
) hrs
ON s.store_id = hrs.store_id 


LEFT JOIN (
  SELECT
    store_id,

    JSONB_AGG(
      JSONB_BUILD_OBJECT(
        'platform', platform,
        'url', url
      )
      ORDER BY platform
    ) AS social_links

  FROM store_social_links

  GROUP BY store_id

) social
ON s.store_id = social.store_id


    JOIN cities c
      ON s.city_id = c.city_id


    JOIN localities l
      ON s.locality_id = l.locality_id


    LEFT JOIN neighborhoods n
      ON s.neighborhood_id = n.neighborhood_id


    JOIN store_categories sc
      ON s.store_id = sc.store_id


    JOIN categories cat
      ON sc.category_id = cat.category_id


    LEFT JOIN store_subcategories ss
      ON s.store_id = ss.store_id


    LEFT JOIN subcategories sub
      ON ss.subcategory_id = sub.subcategory_id


    LEFT JOIN store_tags st
      ON s.store_id = st.store_id


    LEFT JOIN tags t
      ON st.tag_id = t.tag_id


    LEFT JOIN (
      SELECT
        store_id,

        AVG(rating) AS average_rating,

        COUNT(*) AS total_ratings

      FROM ratings

      GROUP BY store_id

    ) r_avg
      ON s.store_id = r_avg.store_id


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
      AND sc.category_id = $${values.length}
    `;

  }


  query += `

    GROUP BY

      s.store_id,

      c.name,

      l.name,

      n.name,

      cat.name,

      sub.name,

      sp.description,

      sp.description,
sp.phone,
sp.whatsapp,
sp.email,
sp.website,
sp.price_level,
sp.is_verified,
sp.is_featured,

      img.images,

      hrs.hours,

      r_avg.average_rating,

      r_avg.total_ratings,

      social.social_links


    ORDER BY s.name

  `;


  const result = await pool.query(
    query,
    values
  );


  return result.rows;
};


const getStoreById = async (store_id)=>{


const query = `

SELECT

s.*,


sp.description,
sp.phone,
sp.whatsapp,
sp.email,
sp.website,
sp.price_level,
sp.is_verified,
sp.is_featured,


COALESCE(
  img.images,
  '[]'::jsonb
) AS images,


COALESCE(
  hrs.hours,
  '[]'::json
) AS hours,


COALESCE(
  social.social_links,
  '[]'::json
) AS social_links,


c.name AS city_name,

l.name AS locality_name,

n.name AS neighborhood_name,


cat.name AS category_name,


sub.name AS subcategory_name,


COALESCE(
  tags.tags,
  '{}'
) AS tags,


r_avg.average_rating,

r_avg.total_ratings


FROM stores s



LEFT JOIN store_profiles sp
ON s.store_id = sp.store_id



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

) images


FROM store_images

GROUP BY store_id


) img

ON s.store_id = img.store_id




LEFT JOIN (

SELECT

store_id,


JSON_AGG(

JSON_BUILD_OBJECT(

'day_of_week',
day_of_week,

'open_time',
open_time,

'close_time',
close_time,

'is_closed',
is_closed

)

ORDER BY day_of_week

) hours


FROM store_hours

GROUP BY store_id


) hrs

ON s.store_id = hrs.store_id




LEFT JOIN (

SELECT

store_id,


JSON_AGG(

JSON_BUILD_OBJECT(

'platform',
platform,

'url',
url

)

) social_links


FROM store_social_links

GROUP BY store_id


) social

ON s.store_id = social.store_id




JOIN cities c
ON s.city_id=c.city_id


JOIN localities l
ON s.locality_id=l.locality_id


LEFT JOIN neighborhoods n
ON s.neighborhood_id=n.neighborhood_id


JOIN store_categories sc
ON s.store_id=sc.store_id


JOIN categories cat
ON sc.category_id=cat.category_id


LEFT JOIN store_subcategories ss
ON s.store_id=ss.store_id


LEFT JOIN subcategories sub
ON ss.subcategory_id=sub.subcategory_id



LEFT JOIN store_tags st
ON s.store_id=st.store_id


LEFT JOIN tags t
ON st.tag_id=t.tag_id



LEFT JOIN (

SELECT

store_id,

ROUND(
AVG(rating),
1
) average_rating,


COUNT(*) total_ratings


FROM ratings

GROUP BY store_id


) r_avg

ON s.store_id=r_avg.store_id

LEFT JOIN (

  SELECT

  st.store_id,

  ARRAY_AGG(DISTINCT t.name)
  FILTER(
    WHERE t.name IS NOT NULL
  ) AS tags


  FROM store_tags st

  JOIN tags t
  ON st.tag_id=t.tag_id

  GROUP BY st.store_id

) tags

ON s.store_id = tags.store_id

WHERE s.store_id=$1




`;


const result =
await pool.query(
query,
[store_id]
);


return result.rows[0];

};


const getStoreBySlug = async (slug)=>{


const query = `

SELECT *

FROM stores

WHERE slug = $1

`;


const result = await pool.query(
  query,
  [slug]
);


return result.rows[0];

};


module.exports = {
 searchStores,
 getStoreById,
 getStoreBySlug
};