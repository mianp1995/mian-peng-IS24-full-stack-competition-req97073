const productsData = require('../data/products');const uuid = require('uuid');

const getAllProducts = async (req, res) => {
  return res.status(200).json(productsData);
};

const createProduct = async (req, res) => {
  console.log(req.body);
  const {
    productName,
    productOwner,
    developers,
    scrumMaster,
    startDate,
    methodology,
  } = req.body;
  if (!productName || !productOwner || !developers || !scrumMaster || !startDate || !methodology) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newProduct = {
    productId: uuid.v4(),
    productName,
    productOwner,
    developers,
    scrumMaster,
    startDate,
    methodology
  };


  productsData.push(newProduct);

  return res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  console.log(req.body);

  if (!id) return res.status(400).json({ error: 'Product ID is required' });

  const {
    productName,
    productOwner,
    developers,
    scrumMaster,
    startDate,
    methodology,
  } = req.body;

  const foundIdx = productsData.findIndex(p =>  p.productId === id);
  if (foundIdx === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (productName) productsData[foundIdx].productName = productName;
  if (productOwner) productsData[foundIdx].productOwner = productOwner;
  if (developers) productsData[foundIdx].developers = developers;
  if (scrumMaster) productsData[foundIdx].scrumMaster = scrumMaster;
  if (startDate) productsData[foundIdx].startDate = startDate;
  if (methodology) productsData[foundIdx].methodology = methodology;

  console.log("updated");
  return res.status(200).json(productsData[foundIdx]);
};

const getProductsByScrumMaster = async (req, res) => {
  const { scrumMaster } = req.params;

  if (!scrumMaster) return res.status(400).json({ error: 'scrumMasterName is required' });

  return res.status(200).json(productsData.filter(p => p.scrumMaster === scrumMaster));
};

const getProductsByDeveloper = async (req, res) => {
  const { developer } = req.params;

  if (!developer) return res.status(400).json({ error: 'developerName is required' });

  const filteredProducts = productsData.filter(p => p.developers.includes(developer));
  return res.status(200).json(filteredProducts);
};


module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductsByScrumMaster,
  getProductsByDeveloper
};
