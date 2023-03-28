import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/api/products`);
  return response.data;
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/api/products`, productData);
    console.log('Product created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async(productData) => {
  const response = await axios.put(`${API_URL}/api/products/${productData.productId}`, productData);
  return response.data;
}

export const searchProductByScrumMaster = async(scrumMaster) => {
  const response = await axios.get(`${API_URL}/api/products/scrum-master/${scrumMaster}`);
  return response.data;
}

export const searchProductByDeveloper = async(developer) => {
  const response = await axios.get(`${API_URL}/api/products/developer/${developer}`);
  return response.data;
}
