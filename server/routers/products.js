const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

// Get all products
router.get('/', productsController.getAllProducts);

// Add a new product
router.post('/', productsController.addNewProduct);

// Update an existing product
router.put('/:productId', productsController.updateProduct);

// Delete a product
router.delete('/:productId', productsController.deleteProduct);

// Search products by Scrum Master name
router.get('/scrum-master/:scrumMasterName', productsController.getProductsByScrumMaster);

// Search products by developer name
router.get('/developer/:developerName', productsController.getProductsByDeveloper);

module.exports = router;
