import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import AddProductForm from "./components/AddProductForm";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const res = await axios.post("/api/products", newProduct);
      setProducts([...products, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const editProduct = async (updatedProduct) => {
    try {
      const res = await axios.put(
        `/api/products/${updatedProduct.productId}`,
        updatedProduct
      );
      setProducts(
        products.map((product) =>
          product.productId === res.data.productId ? res.data : product
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      setProducts(products.filter((product) => product.productId !== productId));
    } catch (err) {
      console.log(err);
    }
  };

  const searchProductsByScrumMaster = async (scrumMasterName) => {
    try {
      const res = await axios.get(`/api/scrum-masters/${scrumMasterName}`);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const searchProductsByDeveloper = async (developerName) => {
    try {
      const res = await axios.get(`/api/developers/${developerName}`);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center mb-4">IMB Products</h1>
          <ProductList
            products={products}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
            searchProductsByScrumMaster={searchProductsByScrumMaster}
            searchProductsByDeveloper={searchProductsByDeveloper}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2 className="text-center mb-4">Add New Product</h2>
          <AddProductForm addProduct={addProduct} />
        </div>
      </div>
    </div>
  );
}

export default App;
