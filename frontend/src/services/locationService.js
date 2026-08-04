import API_URL from "../config/api";

/*
  Busca una dirección mediante nuestro backend.
*/
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
    `${API_URL}/api/location/search?` +
    `q=${encodeURIComponent(query)}`;

  console.log(
    "LOCATION SEARCH:",
    url
  );

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();

    console.log(
      "LOCATION STATUS:",
      response.status
    );

    console.log(
      "LOCATION BODY:",
      text
    );

    throw new Error(
      "No fue posible buscar la dirección."
    );
  }

  const data = await response.json();

  if (!data) {
    return null;
  }

  return {
    latitude: Number(data.latitude),
    longitude: Number(data.longitude),
    displayName: data.displayName,
    address: data.address,
  };
}


/*
  Devuelve sugerencias para el autocompletado.

  Por ahora utiliza el mismo endpoint
  del backend.
*/
export async function searchAddressSuggestions(
  query
) {
  if (
    !query ||
    query.trim().length < 3
  ) {
    return [];
  }

  const url =
    `${API_URL}/api/location/search?` +
    `q=${encodeURIComponent(
      `${query}, Colombia`
    )}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "No fue posible buscar direcciones."
    );
  }

  const data = await response.json();

  if (!data) {
    return [];
  }

  return [
    {
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      displayName: data.displayName,
      address: data.address,
    },
  ];
}