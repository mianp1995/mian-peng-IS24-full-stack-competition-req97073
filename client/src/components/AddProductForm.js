import React, { useState } from 'react';
import { createProduct } from '../services/productService';
import { Button, Form, Input, Dropdown } from 'semantic-ui-react';

function AddProductForm({ closeModal, onProductAdd }) {
  const [productName, setProductName] = useState('');
  const [scrumMaster, setScrumMaster] = useState('');
  const [productOwner, setProductOwner] = useState('');
  const [developers, setDevelopers] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [methodology, setMethodology] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //Validate developers number
    const developersList = developers.split(',').map((dev) => dev.trim());
    if (developersList.length > 5) {
      alert('Please enter up to 5 developer names');
      return;
    }

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
      if (!newProduct) {
        throw new Error('Failed to create product.');
      }
      onProductAdd(newProduct);
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again later.');
    }
  };

  const methodologyOptions = [
    { key: 'agile', text: 'Agile', value: 'Agile' },
    { key: 'waterfall', text: 'Waterfall', value: 'Waterfall' },
  ];

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label htmlFor="productName">Product Name:</label>
        <Input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="scrumMaster">Scrum Master:</label>
        <Input
          type="text"
          id="scrumMaster"
          value={scrumMaster}
          onChange={(e) => setScrumMaster(e.target.value)}
          required
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="productOwner">Product Owner:</label>
        <Input
          type="text"
          id="productOwner"
          value={productOwner}
          onChange={(e) => setProductOwner(e.target.value)}
          required
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="developers">Developer Names (up to 5, comma-separated):</label>
        <Input
          type="text"
          id="developers"
          value={developers}
          onChange={(e) => setDevelopers(e.target.value)}
          required
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="startDate">Start Date:</label>
        <Input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="methodology">Methodology:</label>
        <Dropdown
          id="methodology"
          selection
          options={methodologyOptions}
          value={methodology}
          onChange={(e, { value }) => setMethodology(value)}
          required
        />
      </Form.Field>
      <Button type="submit" primary>
        Save
      </Button>
    </Form>
  );
}

export default AddProductForm;
