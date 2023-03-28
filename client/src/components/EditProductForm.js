import React, { useState } from 'react';
import { updateProduct } from '../services/productService';

function EditProductForm({ product, closeModal, onProductEdit }) {
  const [productName, setProductName] = useState(product.productName);
  const [scrumMaster, setScrumMaster] = useState(product.scrumMaster);
  const [productOwner, setProductOwner] = useState(product.productOwner);
  const [developers, setDevelopers] = useState(product.developers.join(', '));
  const [startDate, setStartDate] = useState(product.startDate);
  const [methodology, setMethodology] = useState(product.methodology);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validate developers number
    const developersList = developers.split(',').map((dev) => dev.trim());
    if (developersList.length > 5) {
      alert('Please enter up to 5 developer names');
      return;
    }

    const productData = {
      productId: product.productId,
      productName,
      scrumMaster,
      productOwner,
      developers: developers.split(',').map((dev) => dev.trim()),
      startDate,
      methodology,
    };

    try {
      const updatedProduct = await updateProduct(productData);
      onProductEdit(updatedProduct);
      closeModal();
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="scrumMaster">Scrum Master:</label>
        <input
          type="text"
          id="scrumMaster"
          value={scrumMaster}
          onChange={(e) => setScrumMaster(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="productOwner">Product Owner:</label>
        <input
          type="text"
          id="productOwner"
          value={productOwner}
          onChange={(e) => setProductOwner(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="developers">Developer Names (up to 5, comma-separated):</label>
        <input
          type="text"
          id="developers"
          value={developers}
          onChange={(e) => setDevelopers(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="methodology">Methodology:</label>
        <select
          id="methodology"
          value={methodology}
          onChange={(e) => setMethodology(e.target.value)}
          required
        >
          <option value="">Select a methodology</option>
          <option value="Agile">Agile</option>
          <option value="Waterfall">Waterfall</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default EditProductForm;

