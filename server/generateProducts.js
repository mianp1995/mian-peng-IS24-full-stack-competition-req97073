const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const names = [
  "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Helen", "Ivy", "Jack", "John", "Jane", "Samantha", "Peter"
];

const methodologies = ["Agile", "Waterfall"];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomName() {
  return names[getRandomInt(0, names.length)];
}

function getRandomMethodology() {
  return methodologies[getRandomInt(0, methodologies.length)];
}

function getRandomDevelopers() {
  const numOfDevelopers = getRandomInt(1, 6);
  const developers = new Set();
  while (developers.size < numOfDevelopers) {
    developers.add(getRandomName());
  }
  return Array.from(developers);
}

const products = Array.from({ length: 50 }, () => ({
  productId: uuidv4(),
  productName: `Project ${getRandomName()}`,
  productOwner: getRandomName(),
  developers: getRandomDevelopers(),
  scrumMaster: getRandomName(),
  startDate: `2022-0${getRandomInt(1, 10)}-0${getRandomInt(1, 10)}`,
  methodology: getRandomMethodology(),
}));

fs.writeFileSync("productsData.js", `module.exports = ${JSON.stringify(products, null, 2)};`);
console.log("File generated successfully!");
