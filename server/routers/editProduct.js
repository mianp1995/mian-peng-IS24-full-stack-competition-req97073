const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const products = require('../data/products');

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const product = products.find(prod => prod.id === id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.json(product);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { productName, productOwnerName, developers, scrumMasterName, startDate, methodology } = req.body;
  const productIndex = products.findIndex(prod => prod.id === id);
  if (productIndex < 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const updatedProduct = {
    id,
    productName,
    productOwnerName,
    developers,
    scrumMasterName,
    startDate,
    methodology
  };
  products.splice(productIndex, 1, updatedProduct);
  return res.json(updatedProduct);
});

module.exports = router;
