import React, { useState, useEffect } from 'react';
import { Button, Container, Dropdown, Header, Table, Modal as SemanticModal, Pagination, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Modal from 'react-modal';
import { getAllProducts, searchProductByScrumMaster, searchProductByDeveloper } from '../services/productService';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';


Modal.setAppElement('#root');

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [scrumMasterSearch, setScrumMasterSearch] = useState('');
  const [developerSearch, setDeveloperSearch] = useState('');

  // Pagination states
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Items per page options
  const itemsPerPageOptions = [
    { key: 5, text: '5', value: 5 },
    { key: 10, text: '10', value: 10 },
    { key: 25, text: '25', value: 25 },
    { key: 50, text: '50', value: 50 },
  ];


  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);
  
  //functions for addProductForm
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  //functions for editProductForm
  const openEditModal = (product) => {
    setIsEditModalOpen(true);
    setProductToEdit(product);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setProductToEdit(null);
  };
  
  //function for adding products
  const handleProductAddition = (newProduct) => {
    setProducts([...products, newProduct]);
  };
  
  //function for editting products
  const handleProductEdit = (editedProduct) => {
    const updatedProducts = products.map((product) =>
      product.productId === editedProduct.productId ? editedProduct : product
    );
    setProducts(updatedProducts);
  };
  
  // function for handlling search

  function handleSearch(type) {
    if (type === 'scrumMaster') {
      searchProductByScrumMaster(scrumMasterSearch)
        .then((searchResults) => {
          setProducts(searchResults);
        })
        .catch((error) => {
          console.error('Error searching products by Scrum Master:', error);
        });
    } else if (type === 'developer') {
      searchProductByDeveloper(developerSearch)
        .then((searchResults) => {
          setProducts(searchResults);
        })
        .catch((error) => {
          console.error('Error searching products by Developer:', error);
        });
    }
  }

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  const handleItemsPerPageChange = (e, { value }) => {
    setItemsPerPage(value);
    setActivePage(1);
  };

  const getPageItems = (items, activePage, itemsPerPage) => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const visibleProducts = getPageItems(products, activePage, itemsPerPage);
  
  return (
    <Container>
      <Header as="h1">Product List</Header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <div>
        <Input
          icon="search"
          placeholder="Search by Scrum Master..."
          value={scrumMasterSearch}
          onChange={(e) => setScrumMasterSearch(e.target.value)}
        />
        <Input
          icon="search"
          placeholder="Search by Developer..."
          value={developerSearch}
          onChange={(e) => setDeveloperSearch(e.target.value)}
        />
        <Button primary onClick={() => handleSearch('scrumMaster')}>
          Search by Scrum Master
        </Button>
        <Button primary onClick={() => handleSearch('developer')}>
          Search by Developer
        </Button>
        <Button secondary onClick={() => {
          window.location.reload();
        }}>
          Reset
        </Button>
      </div>
        <Button primary onClick={openModal}>
          Add Product
        </Button>
      </div>
      <SemanticModal
        closeIcon
        open={isModalOpen}
        onClose={closeModal}
        size="small"
      >
        <Header content="Add Product" />
        <SemanticModal.Content>
          <AddProductForm closeModal={closeModal} onProductAdd={handleProductAddition} />
        </SemanticModal.Content>
      </SemanticModal>
      {productToEdit && (
        <SemanticModal
          closeIcon
          open={isEditModalOpen}
          onClose={closeEditModal}
          size="small"
        >
          <Header content="Edit Product" />
          <SemanticModal.Content>
            <EditProductForm
              product={productToEdit}
              closeModal={closeEditModal}
              onProductEdit={handleProductEdit}
            />
          </SemanticModal.Content>
        </SemanticModal>
      )}
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product Number</Table.HeaderCell>
            <Table.HeaderCell>Product Name</Table.HeaderCell>
            <Table.HeaderCell>Scrum Master</Table.HeaderCell>
            <Table.HeaderCell>Product Owner</Table.HeaderCell>
            <Table.HeaderCell>Developers</Table.HeaderCell>
            <Table.HeaderCell>Start Date</Table.HeaderCell>
            <Table.HeaderCell>Methodology</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {visibleProducts.map((product) => (
            <Table.Row key={product.productId}>
              <Table.Cell>{product.productId}</Table.Cell>
              <Table.Cell>{product.productName}</Table.Cell>
              <Table.Cell>{product.scrumMaster}</Table.Cell>
              <Table.Cell>{product.productOwner}</Table.Cell>
              <Table.Cell>{product.developers.join(', ')}</Table.Cell>
              <Table.Cell>{product.startDate}</Table.Cell>
              <Table.Cell>{product.methodology}</Table.Cell>
              <Table.Cell>
                <Button primary onClick={() => openEditModal(product)}>
                  Edit
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="7">Total Products: {products.length}</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <Pagination
          activePage={activePage}
          totalPages={Math.ceil(products.length / itemsPerPage)}
          onPageChange={handlePaginationChange}
        />
        <Dropdown
          selection
          options={itemsPerPageOptions}
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        />
      </div>
    </Container>
  );
}

export default ProductList;
