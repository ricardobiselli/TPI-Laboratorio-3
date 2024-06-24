import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => navigate("/");
  const handleProductsClick = () => navigate("/products");
  const handlePcBuilderClick = () => navigate("/pc-builder");

  const handleLoginClick = () => navigate("/login");
  const handleRegisterClick = () => navigate("/register");
  const handleAddProductClick = () => navigate("/add-product-form");

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand onClick={handleHomeClick}>PC Building</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link onClick={handleProductsClick}>Productos</Nav.Link>
            <Nav.Link onClick={handlePcBuilderClick}>Arma tu PC</Nav.Link>
            <Nav.Link onClick={handleAddProductClick}>
              Agregar producto
            </Nav.Link>{" "}
            {/*boton para el admin*/}
          </Nav>
          <div className="d-flex flex-grow-1 justify-content-center">
            <Form
              className="d-flex w-100 w-lg-auto"
              style={{ maxWidth: "600px" }}
            >
              <Form.Control
                type="search"
                placeholder="Busca componentes..."
                className="me-2"
                aria-label="Search"
                style={{ minWidth: "150px", maxWidth: "100%" }}
              />
              <Button variant="success" className="me-2">
                <i className="fa-brands fa-searchengin"></i>
              </Button>
            </Form>
          </div>
          <div className="d-flex flex-column flex-lg-row ms-auto">
            <Button
              variant="outline-primary"
              className="me-2 mb-2 mb-lg-0 btn-sm"
              style={{ maxWidth: "140px" }}
              onClick={handleLoginClick}
            >
              Loguearse
            </Button>
            <Button
              variant="primary"
              className="btn-sm"
              style={{ maxWidth: "140px" }}
              onClick={handleRegisterClick}
            >
              Registrarse
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
