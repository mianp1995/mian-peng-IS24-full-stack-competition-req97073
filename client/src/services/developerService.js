import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const getDevelopers = async () => {
  const response = await axios.get(`${BASE_URL}/developers`);
  return response.data;
};

export const addDeveloper = async (developerData) => {
  const response = await axios.post(`${BASE_URL}/developers`, developerData);
  return response.data;
};

export const updateDeveloper = async (id, developerData) => {
  const response = await axios.put(`${BASE_URL}/developers/${id}`, developerData);
  return response.data;
};

export const deleteDeveloper = async (id) => {
  await axios.delete(`${BASE_URL}/developers/${id}`);
};

export const searchDevelopers = async (query) => {
  const response = await axios.get(`${BASE_URL}/developers/search?query=${query}`);
  return response.data;
};
