const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const app = express();

// enable CORS
app.use(cors());

// parse incoming requests with JSON payloads
app.use(bodyParser.json());

// define routes
app.use('/api/products', productRoutes);

// define port
const port = 3000;

// start the server
app.listen(port, () => {
  console.log(`Server started listening on port ${port}`);
});
