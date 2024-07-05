import { Nav } from "react-bootstrap";

const ProductsMenu = ({ setCategorySelected }) => {
  const handleCategoryClick = (category) => {
    setCategorySelected(category);
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{
        width: "200px",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 57,
      }}
    >
      <span className="fs-4">Categorías</span>
      <hr />
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link onClick={() => handleCategoryClick("CPU")}>
            Procesadores
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => handleCategoryClick("Motherboard")}>
            Placas Madre
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => handleCategoryClick("RAM")}>RAM</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => handleCategoryClick("Storage")}>
            Almacenamiento
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => handleCategoryClick("GPU")}>GPU</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => handleCategoryClick("PSU")}>PSU</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => handleCategoryClick("Case")}>Case</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => handleCategoryClick("Electronics")}>
            Otros
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default ProductsMenu;
