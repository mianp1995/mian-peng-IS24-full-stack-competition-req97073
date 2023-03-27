import React, { useState } from 'react';
import { createProduct } from '../services/productService';

function AddProductForm({ closeModal, onProductAdd }) {
  const [productName, setProductName] = useState('');
  const [scrumMaster, setScrumMaster] = useState('');
  const [productOwner, setProductOwner] = useState('');
  const [developers, setDevelopers] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [methodology, setMethodology] = useState('');

  const handleSubmit = async (e) => {
    console.log("sdad");
    e.preventDefault();
    const productData = {
      productName,
      scrumMaster,
      productOwner,
      developers: developers.split(',').map((dev) => dev.trim()),
      startDate,
      methodology,
    };

    try {
      const newProduct = await createProduct(productData);
      onProductAdd(newProduct);
      closeModal();
      window.location.reload(); 
    } catch (error) {
      console.error('Error submitting form:', error);
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

export default AddProductForm;
