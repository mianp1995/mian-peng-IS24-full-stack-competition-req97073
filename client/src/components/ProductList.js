import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getAllProducts } from '../services/productService';
import AddProductForm from './AddProductForm';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProductAddition = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div>
      <h1>Product List</h1>
      <button className="btn btn-primary" onClick={openModal}>
        Add Product
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Product"
      >
        <h2>Add Product</h2>
        <AddProductForm closeModal={closeModal} onProductAdd={handleProductAddition} />
        <button className="btn btn-secondary" onClick={closeModal}>
          Close
        </button>
      </Modal>
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
