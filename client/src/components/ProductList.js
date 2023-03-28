import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getAllProducts } from '../services/productService';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';


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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

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

  const openEditModal = (product) => {
    setIsEditModalOpen(true);
    setProductToEdit(product);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setProductToEdit(null);
  };

  const handleProductAddition = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleProductEdit = (editedProduct) => {
    const updatedProducts = products.map((product) =>
      product.productId === editedProduct.productId ? editedProduct : product
    );
    setProducts(updatedProducts);
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
      {productToEdit && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          style={customStyles}
          contentLabel="Edit Product"
        >
          <h2>Edit Product</h2>
          <EditProductForm
            product={productToEdit}
            closeModal={closeEditModal}
            onProductEdit={handleProductEdit}
          />
          <button className="btn btn-secondary" onClick={closeEditModal}>
            Close
          </button>
        </Modal>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Product Number</th>
            <th>Product Name</th>
            <th>Scrum Master</th>
            <th>Product Owner</th>
            <th>Developers</th>
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
              <td>{product.scrumMaster}</td>
              <td>{product.productOwner}</td>
              <td>{product.developers.join(', ')}</td>
              <td>{product.startDate}</td>
              <td>{product.methodology}</td>
              <td>
                <button className="btn btn-primary" onClick={() => openEditModal(product)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="7">Total Products: {products.length}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ProductList;
