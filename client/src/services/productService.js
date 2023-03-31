import axios from 'axios';
const API_URL = 'http://localhost:8080';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products`);
    return response.data;
  } catch (error) {
    console.error('Error getting all products:', error);
    throw error;
  }
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

export const updateProduct = async (productData) => {
  try {
    const response = await axios.put(`${API_URL}/api/products/${productData.productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const searchProductByScrumMaster = async (scrumMaster) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/scrum-master/${scrumMaster}`);
    return response.data;
  } catch (error) {
    console.error('Error searching for product by Scrum Master:', error);
    throw error;
  }
};

export const searchProductByDeveloper = async (developer) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/developer/${developer}`);
    return response.data;
  } catch (error) {
    console.error('Error searching for product by developer:', error);
    throw error;
  }
};
