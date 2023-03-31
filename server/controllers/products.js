const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const productsFilePath = path.join(__dirname, '..', 'data', 'productsData.json');

//get all products
const getAllProducts = async (req, res) => {
  const productsData = JSON.parse(fs.readFileSync(productsFilePath));
  return res.status(200).json(productsData);
};

//add a new product
const createProduct = async (req, res) => {
  const productsData = JSON.parse(fs.readFileSync(productsFilePath));

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

  fs.writeFileSync(productsFilePath, JSON.stringify(productsData));

  return res.status(200).json(newProduct);
};

//update an existing product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  const productsData = JSON.parse(fs.readFileSync(productsFilePath));

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

  fs.writeFileSync(productsFilePath, JSON.stringify(productsData));

  return res.status(200).json(productsData[foundIdx]);
};

//search product by a scrum master's name
const searchProductByScrumMaster = async (req, res) => {
  const { scrumMaster } = req.params;

  const productsData = JSON.parse(fs.readFileSync(productsFilePath));

  if (!scrumMaster) return res.status(400).json({ error: 'scrumMasterName is required' });

  return res.status(200).json(productsData.filter(p => p.scrumMaster === scrumMaster));
};

//search product by a developer's name
const searchProductByDeveloper = async (req, res) => {
  const { developer } = req.params;

  const productsData = JSON.parse(fs.readFileSync(productsFilePath));

  if (!developer) return res.status(400).json({ error: 'developerName is required' });

  const filteredProducts = productsData.filter(p => p.developers.includes(developer));
  return res.status(200).json(filteredProducts);
};


module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  searchProductByScrumMaster,
  searchProductByDeveloper
};

