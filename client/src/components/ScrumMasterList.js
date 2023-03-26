import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import SearchBar from "./SearchBar";

const ScrumMasterList = () => {
  const [scrumMasters, setScrumMasters] = useState([]);
  const [selectedScrumMaster, setSelectedScrumMaster] = useState("");
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios.get("/api/scrumMasters").then((response) => {
      setScrumMasters(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProductList(response.data);
    });
  }, []);

  const handleScrumMasterSelect = (event) => {
    setSelectedScrumMaster(event.target.value);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      axios.get("/api/products").then((response) => {
        setProductList(response.data);
      });
    } else {
      axios.get(`/api/products?scrumMasterName=${searchTerm}`).then((response) => {
        setProductList(response.data);
      });
    }
  };

  const filteredProducts = selectedScrumMaster
    ? productList.filter((product) => product.scrumMasterName === selectedScrumMaster)
    : productList;

  return (
    <>
      <h1>Scrum Master List</h1>
      <SearchBar handleSearch={handleSearch} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Scrum Master Name</th>
            <th>Product Name</th>
            <th>Product Owner</th>
            <th>Developers</th>
            <th>Start Date</th>
            <th>Methodology</th>
          </tr>
        </thead>
        <tbody>
          {scrumMasters.map((scrumMaster) => (
            <tr key={scrumMaster.id}>
              <td>
                <input
                  type="radio"
                  value={scrumMaster.name}
                  checked={selectedScrumMaster === scrumMaster.name}
                  onChange={handleScrumMasterSelect}
                />{" "}
                {scrumMaster.name}
              </td>
              <td colSpan={5}>
                <Table striped bordered hover>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.productId}>
                        <td>{product.productName}</td>
                        <td>{product.productOwnerName}</td>
                        <td>{product.developers.join(", ")}</td>
                        <td>{product.startDate}</td>
                        <td>{product.methodology}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ScrumMasterList;
