const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

// Get all products
router.get('/', productsController.getAllProducts);

// Add a new product
router.post('/', productsController.createProduct);

// Update an existing product
router.put('/:id', productsController.updateProduct);

// Search products by Scrum Master name
router.get('/scrum-master/:scrumMaster', productsController.searchProductByScrumMaster);

// Search products by developer name
router.get('/developer/:developer', productsController.searchProductByDeveloper);

module.exports = router;
