import API_URL from "../config/api";

export async function getStorePhotos(
  store
) {
  const response = await fetch(
    `${API_URL}/api/photos/store/${store.store_id}`
  );

  if (!response.ok) {
    throw new Error(
      "No se pudieron obtener las fotos."
    );
  }

  const userPhotos =
    await response.json();

  const photos = [];

  /*
    Agregar primero todas las
    fotos oficiales del establecimiento
  */

  if (
    Array.isArray(store.images) &&
    store.images.length > 0
  ) {
    photos.push(
      ...store.images.map(
        (image, index) => ({
          photo_id: `cover_${index}`,
          image_url:
            image.image_url,
          image_type:
            image.image_type,
          is_primary:
            image.is_primary,
          is_cover: true,
          name: null,
        })
      )
    );
  }

  /*
    Después agregar todas las
    fotos subidas por usuarios
  */

  if (
    Array.isArray(userPhotos) &&
    userPhotos.length > 0
  ) {
    photos.push(
      ...userPhotos.map(photo => ({
        ...photo,
        is_cover: false,
      }))
    );
  }

  return photos;
}

export async function uploadStorePhoto(
  image,
  store,
  user
) {
  const formData =
    new FormData();

  formData.append(
    "user_id",
    user.user_id
  );

  formData.append(
    "store_id",
    store.store_id
  );

  formData.append(
    "image",
    {
      uri: image.uri,
      type:
        image.mimeType ||
        "image/jpeg",
      name:
        image.fileName ||
        `photo_${Date.now()}.jpg`,
    }
  );

  const response = await fetch(
    `${API_URL}/api/photos`,
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
        "No se pudo subir la foto."
    );
  }

  return data;
}

export async function deletePhoto(
  photo_id,
  user_id
) {
  const response = await fetch(
    `${API_URL}/api/photos/${photo_id}/${user_id}`,
    {
      method: "DELETE",
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "No se pudo eliminar la foto."
    );
  }

  return data;
}