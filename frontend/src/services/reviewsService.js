import API_URL from "../config/api";

export async function getStoreReviews(
  store_id
) {
  const response = await fetch(
    `${API_URL}/api/reviews/${store_id}`
  );

  if (!response.ok) {
    throw new Error(
      "No se pudieron obtener las reseñas."
    );
  }

  return await response.json();
}

export async function getUserReview(
  store_id,
  user_id
) {
  const response = await fetch(
    `${API_URL}/api/reviews/${store_id}/${user_id}`
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      "No se pudo obtener la reseña del usuario."
    );
  }

  return await response.json();
}

export async function saveReview(
  review,
  image = null
) {
  const formData =
    new FormData();

  formData.append(
    "user_id",
    review.user_id
  );

  formData.append(
    "store_id",
    review.store_id
  );

  formData.append(
    "comment",
    review.comment
  );

  if (image) {
    formData.append(
      "image",
      {
        uri: image.uri,
        type:
          image.mimeType ||
          "image/jpeg",
        name:
          image.fileName ||
          `review_${Date.now()}.jpg`,
      }
    );
  }

  const response = await fetch(
    `${API_URL}/api/reviews`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Error al guardar la reseña."
    );
  }

  return data;
}

export async function deleteReview(
  store_id,
  user_id
) {
  const response = await fetch(
    `${API_URL}/api/reviews/${store_id}/${user_id}`,
    {
      method: "DELETE",
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Error al eliminar la reseña."
    );
  }

  return data;
}