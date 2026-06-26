import API_URL from "../config/api";

export async function getFavorites(
  user_id
) {
  const response = await fetch(
    `${API_URL}/api/favorites/${user_id}`
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "No se pudieron obtener los favoritos."
    );
  }

  return data;
}

export async function addFavorite(
  user_id,
  store_id
) {
  const response = await fetch(
    `${API_URL}/api/favorites`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        user_id,
        store_id,
      }),
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "No se pudo guardar favorito."
    );
  }

  return data;
}

export async function removeFavorite(
  user_id,
  store_id
) {
  const response = await fetch(
    `${API_URL}/api/favorites/${user_id}/${store_id}`,
    {
      method: "DELETE",
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "No se pudo eliminar favorito."
    );
  }

  return data;
}