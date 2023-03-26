import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const EditProductForm = (props) => {
  const { product, onUpdate } = props;
  const [productName, setProductName] = useState(product.productName);
  const [productOwnerName, setProductOwnerName] = useState(product.productOwnerName);
  const [scrumMasterName, setScrumMasterName] = useState(product.scrumMasterName);
  const [developerNames, setDeveloperNames] = useState(product.developerNames.join(', '));
  const [startDate, setStartDate] = useState(product.startDate);
  const [methodology, setMethodology] = useState(product.methodology);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const developers = developerNames.split(',').map(name => name.trim());
    const updatedProduct = {
      ...product,
      productName,
      productOwnerName,
      scrumMasterName,
      developerNames: developers,
      startDate,
      methodology,
    };
    try {
      await axios.put(`/api/products/${product.productId}`, updatedProduct);
      onUpdate(updatedProduct);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="productName">Product Name</Label>
        <Input type="text" name="productName" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label for="productOwnerName">Product Owner</Label>
        <Input type="text" name="productOwnerName" id="productOwnerName" value={productOwnerName} onChange={(e) => setProductOwnerName(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label for="scrumMasterName">Scrum Master</Label>
        <Input type="text" name="scrumMasterName" id="scrumMasterName" value={scrumMasterName} onChange={(e) => setScrumMasterName(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label for="developerNames">Developer Names (up to 5)</Label>
        <Input type="text" name="developerNames" id="developerNames" value={developerNames} onChange={(e) => setDeveloperNames(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label for="startDate">Start Date</Label>
        <Input type="date" name="startDate" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label for="methodology">Methodology</Label>
        <Input type="select" name="methodology" id="methodology" value={methodology} onChange={(e) => setMethodology(e.target.value)} required >
          <option value="">-- Select Methodology --</option>
          <option value="Agile">Agile</option>
          <option value="Waterfall">Waterfall</option>
        </Input>
      </FormGroup>
      <Button type="submit">Save</Button>
    </Form>
  );
};

export default EditProductForm;
