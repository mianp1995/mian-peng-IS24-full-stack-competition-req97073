const productsData = require('../data/products');const uuid = require('uuid');

const getAllProducts = async (req, res) => {
  return res.status(200).json(productsData);
};

const createProduct = async (req, res) => {
  const {
    productName,
    productOwnerName,
    developers,
    scrumMasterName,
    startDate,
    methodology,
  } = req.body;
  if (!productName || !productOwnerName || !developers || !scrumMasterName || !startDate || !methodology) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newProduct = {
    productId: uuid.v4(),
    productName,
    productOwnerName,
    developers,
    scrumMasterName,
    startDate,
    methodology
  };

  productsData.push(newProduct);

  return res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: 'Product ID is required' });

  const {
    productName,
    productOwnerName,
    developers,
    scrumMasterName,
    startDate,
    methodology,
  } = req.body;

  const foundIdx = productsData.findIndex(p =>  p.productId === id);
  if (foundIdx === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (productName) productsData[foundIdx].productName = productName;
  if (productOwnerName) productsData[foundIdx].productOwnerName = productOwnerName;
  if (developers) productsData[foundIdx].developers = developers;
  if (scrumMasterName) productsData[foundIdx].scrumMasterName = scrumMasterName;
  if (startDate) productsData[foundIdx].startDate = startDate;
  if (methodology) productsData[foundIdx].methodology = methodology;

  
  return res.status(200).json(productsData[foundIdx]);
};

const getProductsByScrumMaster = async (req, res) => {
  const { scrumMasterName } = req.params;

  if (!scrumMasterName) return res.status(400).json({ error: 'scrumMasterName is required' });

  return res.status(200).json(productsData.filter(p => p.scrumMasterName === scrumMasterName));
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductsByScrumMaster
};
