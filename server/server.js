const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routers/products');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger/swagger.yaml');
const app = express();
// const cacheClient = require('./nodeCache');
// const mockProducts = require('./data/products');

// // load mock data into node cache
// mockProducts.forEach(p => {
//   cacheClient.set()
// })

// enable CORS
app.use(cors());

// parse incoming requests with JSON payloads
app.use(bodyParser.json());

// define routes
app.use('/api/products', productRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// define port
const port = 8080;

// start the server
app.listen(port, () => {
  console.log(`Server started listening on port ${port}`);
});