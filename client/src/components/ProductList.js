import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Owner Name</th>
            <th>Developers</th>
            <th>Scrum Master Name</th>
            <th>Start Date</th>
            <th>Methodology</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.productOwnerName}</td>
              <td>{product.developers.join(', ')}</td>
              <td>{product.scrumMasterName}</td>
              <td>{product.startDate}</td>
              <td>{product.methodology}</td>
              <td><button>Edit</button></td>
              <td><button>Delete</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="8">Total Products:</td>
            <td>{products.length}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ProductList;
