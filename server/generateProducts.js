const fs = require('fs');
const { faker } = require('@faker-js/faker');
const uuid = require('uuid');

const products = [];

// Generate 40 sample products
for (let i = 1; i <= 40; i++) {
  const productId = parseInt(uuid.v4().replace(/-/g, '').substring(0, 8), 16);
  const product = {
    productId: productId,
    productName: faker.commerce.productName(),
    productOwnerName: faker.name.findName(),
    Developers: [
      faker.name.findName(),
      faker.name.findName(),
      faker.name.findName(),
      faker.name.findName(),
      faker.name.findName(),
    ],
    scrumMasterName: faker.name.findName(),
    startDate: faker.date.past(5).toISOString().substring(0, 10),
    methodology: ['Agile', 'Waterfall'][Math.floor(Math.random() * 2)],

  };

  // Check if product name is already in use
  const productNames = products.map((p) => p.productName);
  if (productNames.includes(product.productName)) {
    // If product name is not unique, generate a new one
    product.productName = faker.commerce.productName();
  }

  products.push(product);
}

// Log products array to console
console.log(products);

// Write products array to products.json file
fs.writeFile('products.json', JSON.stringify(products, null, 2), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Products file created!');
  }
});