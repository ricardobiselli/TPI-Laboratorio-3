import { useState } from "react";
import { Nav } from "react-bootstrap";

const ProductsMenu = ({ setCategorySelected }) => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <span className="fs-4">Categories</span>

      <hr />
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link onClick={() => setCategorySelected("Processor")}>
            Processors
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setCategorySelected("Motherboard")}>
            Motherboards
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setCategorySelected("RAM")}>RAM</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setCategorySelected("Storage")}>
            Storage
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setCategorySelected("GPU")}>GPU</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setCategorySelected("PSU")}>PSU</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setCategorySelected("Case")}>Case</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setCategorySelected("Electronics")}>
            Others
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default ProductsMenu;
