const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Product = require('../models/product');
const ScrumMaster = require('../models/scrumMaster');
const Developer = require('../models/developer');

router.post('/', (req, res) => {
  const {
    productName,
    productOwnerName,
    developers,
    scrumMasterName,
    startDate,
    methodology
  } = req.body;

  const product = new Product({
    productId: uuidv4(),
    productName,
    productOwnerName,
    developers,
    scrumMasterName,
    startDate,
    methodology
  });

  const scrumMaster = ScrumMaster.findOneAndUpdate(
    { name: scrumMasterName },
    { $addToSet: { products: product.productId } },
    { upsert: true }
  ).exec();

  const promises = developers.map((developerName) => {
    return Developer.findOneAndUpdate(
      { name: developerName },
      { $addToSet: { products: product.productId } },
      { upsert: true }
    ).exec();
  });

  Promise.all([scrumMaster, ...promises])
    .then(() => {
      product.save()
        .then(() => {
          res.json({
            message: 'Product added successfully'
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: 'Unable to add product'
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'Unable to update Scrum Master or Developer'
      });
    });
});

module.exports = router;
