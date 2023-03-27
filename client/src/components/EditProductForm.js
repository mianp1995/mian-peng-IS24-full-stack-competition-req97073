import React, { useState, useEffect } from 'react';
import { updateProduct } from '../services/productService';

function EditProductForm({ product, closeModal }) {
  // Add your form states here, for example:
  const [productName, setProductName] = useState(product.productName);
  const [productOwnerName, setProductOwnerName] = useState(product.productOwnerName);

  useEffect(() => {
    setProductName(product.productName);
    setProductOwnerName(product.productOwnerName);
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      productName,
      productOwnerName,
    };

    // await updateProduct(updatedProduct);
    // closeModal();
    // window.location.reload(); // Refresh the product list
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form inputs, for example: */}
      <div>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="productOwnerName">Product Owner Name:</label>
        <input
          type="text"
          id="productOwnerName"
          value={productOwnerName}
          onChange={(e) => setProductOwnerName(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>
    </form>
  );
}

export default EditProductForm;
