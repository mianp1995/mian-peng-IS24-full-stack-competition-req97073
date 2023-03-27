import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [scrumMasterName, setScrumMasterName] = useState('');
  const [productOwnerName, setProductOwnerName] = useState('');
  const [developerNames, setDeveloperNames] = useState(['', '', '', '', '']);
  const [startDate, setStartDate] = useState('');
  const [methodology, setMethodology] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!productName || !scrumMasterName || !productOwnerName || !developerNames.every(name => name !== '') || !startDate || !methodology) {
      alert('Please answer all questions before saving.');
      return;
    }

    const newProduct = {
      productName,
      scrumMasterName,
      productOwnerName,
      developerNames,
      startDate,
      methodology,
    };

    try {
      const response = await axios.post('/api/products', newProduct);
      console.log(response.data);
      alert('Product added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add product.');
    }
  };

  const handleDeveloperNameChange = (event, index) => {
    const newDeveloperNames = [...developerNames];
    newDeveloperNames[index] = event.target.value;
    setDeveloperNames(newDeveloperNames);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input type="text" id="productName" value={productName} onChange={event => setProductName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="scrumMasterName">Scrum Master Name:</label>
          <input type="text" id="scrumMasterName" value={scrumMasterName} onChange={event => setScrumMasterName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="productOwnerName">Product Owner Name:</label>
          <input type="text" id="productOwnerName" value={productOwnerName} onChange={event => setProductOwnerName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="developerNames">Developer Names:</label>
          <ul>
            {developerNames.map((name, index) => (
              <li key={index}>
                <input type="text" value={name} onChange={event => handleDeveloperNameChange(event, index)} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" value={startDate} onChange={event => setStartDate(event.target.value)} />
        </div>
        <div>
          <label htmlFor="methodology">Methodology:</label>
          <select id="methodology" value={methodology} onChange={event => setMethodology(event.target.value)}>
            <option value="">Select methodology</option>
            <option value="Agile">Agile</option>
            <option value="Waterfall">Waterfall</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddProductForm;