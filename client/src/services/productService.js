import axios from 'axios';

const API_URL = 'http://localhost:5000';

class ProductService {
  // Get all products
  getAllProducts() {
    return axios.get(`${API_URL}/products`);
  }

  // Get product by id
  getProductById(productId) {
    return axios.get(`${API_URL}/products/${productId}`);
  }

  // Create new product
  createProduct(productData) {
    return axios.post(`${API_URL}/products`, productData);
  }

  // Update product by id
  updateProduct(productId, productData) {
    return axios.put(`${API_URL}/products/${productId}`, productData);
  }

  // Delete product by id
  deleteProduct(productId) {
    return axios.delete(`${API_URL}/products/${productId}`);
  }

  // Search products by Scrum Master name
  searchProductsByScrumMaster(scrumMasterName) {
    return axios.get(`${API_URL}/products?scrumMasterName=${scrumMasterName}`);
  }

  // Search products by Developer name
  searchProductsByDeveloper(developerName) {
    return axios.get(`${API_URL}/products?developerName=${developerName}`);
  }
}

export default new ProductService();
