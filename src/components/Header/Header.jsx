import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import AuthContext from "../../services/authentication/AuthContext";


const Header = ({onSearchSaved }) => {
  const navigate = useNavigate();
  const [enteredSearch, setEnteredSearch] = useState("");
  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  const handleHomeClick = () => navigate("/");
  const handleProductsClick = () => navigate("/products");
  const handlePcBuilderClick = () => navigate("/pc-builder");
  const handleSearch = () => {
    onSearchSaved(enteredSearch)
    navigate("/product-search");
  };
  const handleLoginClick = () => navigate("/login");
  const handleRegisterClick = () => navigate("/register");
  const handleAddProductClick = () => navigate("/add-product-form");
  const handleCartClick = () => navigate("/shopping-cart")
  const handleAddClients = () => navigate("/clients")
  const handleAddProductManager = () => navigate("/productmanager")

  const userRole = user ? user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : null;

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand onClick={handleHomeClick}>PC Building</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link onClick={handleProductsClick}>Productos</Nav.Link>
            <Nav.Link onClick={handlePcBuilderClick}>Arma tu PC</Nav.Link>
            {(userRole === 'admin' || userRole === 'superadmin') && (
              <Nav.Link onClick={handleAddProductClick}>Agregar producto</Nav.Link>
            )}
             {(userRole === 'admin' || userRole === 'superadmin') && (
              <Nav.Link onClick={handleAddProductManager}>Product Manager</Nav.Link>
            )}
            {(userRole === 'superadmin') && (
              <Nav.Link onClick={handleAddClients}>Clientes</Nav.Link>
            )}
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
                onChange={(e) => setEnteredSearch(e.target.value)}
                value={enteredSearch}
              />
              <Button variant="success" className="me-2" onClick={handleSearch}>
                <i className="fa-brands fa-searchengin"></i>
              </Button>
            </Form>
          </div>
          <div className="d-flex flex-column flex-lg-row ms-auto">
          {user ? (<Button
              variant="outline-primary"
              className="me-2 mb-2 mb-lg-0 btn-sm"
              style={{ maxWidth: "140px" }}
              onClick={logout}
            >
              Cerrar sesión
            </Button>) : (
            <Button
              variant="outline-primary"
              className="me-2 mb-2 mb-lg-0 btn-sm"
              style={{ maxWidth: "140px" }}
              onClick={handleLoginClick}
            >
              Iniciar sesión
            </Button>)}
            {!user && (
            <Button
              variant="primary"
              className="btn-sm"
              style={{ maxWidth: "140px" }}
              onClick={handleRegisterClick}
            >
              Registrarse
            </Button>)}
            <Button
              onClick={handleCartClick}
              style={{
                backgroundColor: 'yellow',
                color: 'black',
                borderRadius: '50%',
                width: '50px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Carrito
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  onSearchSaved: PropTypes.func.isRequired,
};

export default Header;
