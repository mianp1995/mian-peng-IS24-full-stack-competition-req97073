const productService = require('../services/productService');

const getProducts = async (req, res) => {
  const products = await productService.getProducts();
  res.json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  return res.json(product);
};

const createProduct = async (req, res) => {
  const {
    productName,
    productOwnerName,
    Developers,
    scrumMasterName,
    startDate,
    methodology,
  } = req.body;
  if (!productName || !productOwnerName || !Developers || !scrumMasterName || !startDate || !methodology) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const product = await productService.createProduct({
    productName,
    productOwnerName,
    Developers,
    scrumMasterName,
    startDate,
    methodology,
  });
  return res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    productName,
    productOwnerName,
    Developers,
    scrumMasterName,
    startDate,
    methodology,
  } = req.body;
  if (!productName || !productOwnerName || !Developers || !scrumMasterName || !startDate || !methodology) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const updatedProduct = await productService.updateProduct({
    id,
    productName,
    productOwnerName,
    Developers,
    scrumMasterName,
    startDate,
    methodology,
  });
  if (!updatedProduct) {
    return res.status(404).json({ error: 'Product not found' });
  }
  return res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productService.deleteProduct(id);
  if (!deletedProduct) {
    return res.status(404).json({ error: 'Product not found' });
  }
  return res.json(deletedProduct);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
