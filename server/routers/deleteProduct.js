const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.delete('/:productId', productsController.deleteProduct);

module.exports = router;
