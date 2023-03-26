import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DeveloperList = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) => {
    const developers = product.Developers.join(', ').toLowerCase();
    return developers.includes(searchTerm.toLowerCase());
  });

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='col-md-12'>
      <div className='card shadow'>
        <div className='card-header'>
          <h4 className='card-title'>Products by Developer</h4>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-12 mb-3'>
              <input
                type='text'
                className='form-control'
                placeholder='Search by Developer Name'
                value={searchTerm}
                onChange={handleChange}
              />
            </div>
          </div>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Scrum Master</th>
                <th>Product Owner</th>
                <th>Developers</th>
                <th>Start Date</th>
                <th>Methodology</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.scrumMasterName}</td>
                  <td>{product.productOwnerName}</td>
                  <td>{product.Developers.join(', ')}</td>
                  <td>{product.startDate}</td>
                  <td>{product.methodology}</td>
                  <td>
                    <Link
                      to={`/edit/${product.productId}`}
                      className='btn btn-sm btn-info mr-1'
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/delete/${product.productId}`}
                      className='btn btn-sm btn-danger'
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeveloperList;
