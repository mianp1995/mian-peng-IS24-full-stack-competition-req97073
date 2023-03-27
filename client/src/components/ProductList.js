import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Product Number</th>
            <th>Product Name</th>
            <th>Product Owner Name</th>
            <th>Developers</th>
            <th>Scrum Master Name</th>
            <th>Start Date</th>
            <th>Methodology</th>
            <th>Edit</th>
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
              <td><button className="btn btn-primary">Edit</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="7">Total Products:</td>
            <td>{products.length}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ProductList;
