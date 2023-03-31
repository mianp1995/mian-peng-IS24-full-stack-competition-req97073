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

const ProductNames = [
  "Product A",
  "Product B",
  "Product C",
  "Product D",
  "Product E",
  "Product F",
  "Product G",
  "Product H",
  "Product I",
  "Product J",
  "Product K",
  "Product L",
  "Product M",
  "Product N",
  "Product O",
  "Product P",
  "Product Q",
  "Product R",
  "Product S",
  "Product T",
  "Product U",
  "Product V",
  "Product W",
  "Product X",
  "Product Y",
  "Product Z",
  "Product AP",
  "Product BT",
  "Product OG",
  "Product TK",
  "Product MK",
  "Product DF",
  "Product CV",
  "Product BV",
  "Product XT",
  "Product RT",
  "Product RM",
  "Product RX",
  "Product SS",
  "Product HG",
  "Product YH",
  "Product JJ",
];
let usedNames = [];
function getRandomProductName() {
  if (usedNames.length === ProductNames.length) {
    usedNames = [];
  }
  let name;
  do {
    const index = Math.floor(Math.random() * ProductNames.length);
    name = ProductNames[index];
  } while (usedNames.includes(name));
  usedNames.push(name);
  return name;
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

const products = Array.from({ length: 40 }, () => ({
  productId: uuidv4(),
  productName: getRandomProductName(),
  productOwner: getRandomName(),
  developers: getRandomDevelopers(),
  scrumMaster: getRandomName(),
  startDate: `2022-0${getRandomInt(1, 10)}-0${getRandomInt(1, 10)}`,
  methodology: getRandomMethodology(),
}));

fs.writeFileSync("productsData.json", JSON.stringify(products, null, 2));
console.log("File generated successfully!");
