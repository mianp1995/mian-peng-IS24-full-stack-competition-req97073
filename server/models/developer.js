const { v4: uuidv4 } = require('uuid');

class Developer {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
    this.products = [];
  }
}

module.exports = Developer;

