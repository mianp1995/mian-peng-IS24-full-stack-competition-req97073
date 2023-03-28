import React, { useState } from 'react';
import { updateProduct } from '../services/productService';
import { Button, Form, Input, Dropdown } from 'semantic-ui-react';

//Define EditProductForm component with props
function EditProductForm({ product, closeModal, onProductEdit }) {
  const [productName, setProductName] = useState(product.productName);
  const [scrumMaster, setScrumMaster] = useState(product.scrumMaster);
  const [productOwner, setProductOwner] = useState(product.productOwner);
  const [developers, setDevelopers] = useState(product.developers.join(', '));
  const [startDate, setStartDate] = useState(product.startDate);
  const [methodology, setMethodology] = useState(product.methodology);

  //Define handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validate developers number
    const developersList = developers.split(',').map((dev) => dev.trim());
    if (developersList.length > 5) {
      alert('Please enter up to 5 developer names');
      return;
    }
    
    // Create product data object with updated fields
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

export default EditProductForm;

