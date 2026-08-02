const NOMINATIM_URL =
  "https://nominatim.openstreetmap.org/search";

export async function searchAddress({
  address,
  city,
  locality,
}) {
  const query = [
    address,
    locality,
    city,
    "Colombia",
  ]
    .filter(Boolean)
    .join(", ");

  const url =
    `${NOMINATIM_URL}?` +
    `q=${encodeURIComponent(query)}` +
    `&format=jsonv2` +
    `&addressdetails=1` +
    `&limit=1`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      "No fue posible buscar la dirección."
    );
  }

  const data = await response.json();

  if (!data.length) {
    return null;
  }

  return {
    latitude: Number(data[0].lat),
    longitude: Number(data[0].lon),
    displayName: data[0].display_name,
    address: data[0].address,
  };
}

/*
  Devuelve varias sugerencias para el autocompletado
*/
export async function searchAddressSuggestions(
  query
) {
  if (!query || query.trim().length < 3) {
    return [];
  }

  const url =
    `${NOMINATIM_URL}?` +
    `q=${encodeURIComponent(
      `${query}, Colombia`
    )}` +
    `&format=jsonv2` +
    `&addressdetails=1` +
    `&limit=5`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      "No fue posible buscar direcciones."
    );
  }

  const data = await response.json();

  return data.map((item) => ({
    latitude: Number(item.lat),
    longitude: Number(item.lon),
    displayName: item.display_name,
    address: item.address,
  }));
}