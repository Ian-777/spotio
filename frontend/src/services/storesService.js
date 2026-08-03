import API_URL from "../config/api";

export async function getCities() {
  const response = await fetch(
    `${API_URL}/api/cities`
  );

  if (!response.ok) {
    throw new Error(
      "No se pudieron obtener las ciudades."
    );
  }

  return await response.json();
}

export async function getLocalities(
  city_id
) {
  const response = await fetch(
    `${API_URL}/api/localities/${city_id}`
  );

  if (!response.ok) {
    throw new Error(
      "No se pudieron obtener las localidades."
    );
  }

  return await response.json();
}

export async function getNeighborhoods(
  locality_id
) {
  const response = await fetch(
    `${API_URL}/api/neighborhoods/${locality_id}`
  );

  if (!response.ok) {
    throw new Error(
      "No se pudieron obtener los barrios."
    );
  }

  return await response.json();
}