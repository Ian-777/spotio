const API_URL = "http://192.168.1.12:3000"; // CAMBIA ESTO

export const getCities = async () => {
  const res = await fetch(`${API_URL}/api/cities`);
  return res.json();
};

export const getLocalities = async (city_id) => {
  const res = await fetch(`${API_URL}/api/localities/${city_id}`);
  return res.json();
};

export const getNeighborhoods = async (locality_id) => {
  const res = await fetch(`${API_URL}/api/neighborhoods/${locality_id}`);
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${API_URL}/api/categories`);
  return res.json();
};

export const searchStores = async (filters) => {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_URL}/stores/search?${query}`);
  return res.json();
};