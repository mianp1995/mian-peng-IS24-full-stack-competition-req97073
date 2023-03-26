const uuid = require('uuid');

class Product {
  constructor(productName, productOwnerName, scrumMasterName, startDate, methodology, developers = []) {
    this.productId = uuid.v4();
    this.productName = productName;
    this.productOwnerName = productOwnerName;
    this.scrumMasterName = scrumMasterName;
    this.startDate = startDate;
    this.methodology = methodology;
    this.developers = developers;
  }
}

module.exports = Product;
