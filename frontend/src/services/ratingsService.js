import API_URL from "../config/api";

export async function getUserRating(
  store_id,
  user_id
) {
  const response = await fetch(
    `${API_URL}/api/ratings/${store_id}/${user_id}`
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      "No se pudo obtener la calificación."
    );
  }

  return await response.json();
}

export async function saveRating(
  rating
) {
  const response = await fetch(
    `${API_URL}/api/ratings`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(rating),
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "No se pudo guardar la calificación."
    );
  }

  return data;
}