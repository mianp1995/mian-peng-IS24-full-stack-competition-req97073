import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/api/products`);
  return response.data;
};

// class ProductService {
//   // Get all products
//   getAllProducts() {
//     return axios.get(`${API_URL}/products`);
//   }

//   // Get product by id
//   getProductById(productId) {
//     return axios.get(`${API_URL}/products/${productId}`);
//   }

//   // Create new product
//   createProduct(productData) {
//     return axios.post(`${API_URL}/products`, productData);
//   }

//   // Update product by id
//   updateProduct(productId, productData) {
//     return axios.put(`${API_URL}/products/${productId}`, productData);
//   }

//   // Search products by Scrum Master name
//   searchProductsByScrumMaster(scrumMasterName) {
//     return axios.get(`${API_URL}/products?scrumMasterName=${scrumMasterName}`);
//   }

//   // Search products by Developer name
//   searchProductsByDeveloper(developer) {
//     return axios.get(`${API_URL}/products?developer=${developer}`);
//   }
// }

// export default new ProductService();
