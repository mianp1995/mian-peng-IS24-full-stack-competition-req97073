import axios from "axios";

const apiUrl = "http://localhost:3001/api/scrumMasters";

export const getAllScrumMasters = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const getScrumMasterById = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`);
  return response.data;
};

export const searchProductByScrumMaster = async (name) => {
  const response = await axios.get(`${apiUrl}/search?name=${name}`);
  return response.data;
};
