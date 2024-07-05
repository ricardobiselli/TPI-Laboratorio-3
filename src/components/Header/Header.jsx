import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../../services/authentication/AuthContext";

const Header = ({ onSearchSaved }) => {
  const navigate = useNavigate();
  const [enteredSearch, setEnteredSearch] = useState("");
  const { user, logout, userRole } = useContext(AuthContext);

  const handleHomeClick = () => navigate("/");
  const handleProductsClick = () => navigate("/products");
  const handlePcBuilderClick = () => navigate("/pc-builder");
  const handleSearch = () => {
    if (e.keyCode == 13 || accion == "click") {
      e.preventDefault();
      onSearchSaved(enteredSearch);
      navigate("/product-search");
    }
  };
  const handleLoginClick = () => navigate("/login");
  const handleRegisterClick = () => navigate("/register");
  const handleCartClick = () => navigate("/shopping-cart");
  const handleAddProductManager = () => navigate("/productmanager");
  const handleAddClients = () => navigate("/clients");
  const handleAddAdmins = () => navigate("/admins");
  const handleOrdersClick = () => {
    if (userRole === "admin" || userRole === "superadmin") {
      navigate("/allorders");
    } else if (userRole === "client") {
      navigate("/clientorderhistory");
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand onClick={handleHomeClick}>PC Building</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            {(!userRole || userRole === "client") && (
              <>
                <Nav.Link onClick={handleProductsClick}>Productos</Nav.Link>
                <Nav.Link onClick={handlePcBuilderClick}>Arma tu PC</Nav.Link>
                <Nav.Link onClick={handleOrdersClick}>Mis Órdenes</Nav.Link>
              </>
            )}
            {(userRole === "admin" || userRole === "superadmin") && (
              <>
                <Nav.Link onClick={handleAddProductManager}>
                  Administrar productos
                </Nav.Link>
                <Nav.Link onClick={handleAddClients}>
                  Administrar Clientes
                </Nav.Link>
                <Nav.Link onClick={handleAddAdmins}>
                  Administrar Admins
                </Nav.Link>
                <Nav.Link onClick={handleOrdersClick}>
                  Todas las Órdenes
                </Nav.Link>
              </>
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
                onKeyDown={(e) => handleSearch(e, "keyDown")}
              />
              <Button
                variant="success"
                className="me-2"
                onClick={(e) => handleSearch(e, "click")}
              >
                <i className="fa-brands fa-searchengin"></i>
              </Button>
            </Form>
          </div>

          <div className="d-flex flex-column flex-lg-row ms-auto">
            {user ? (
              <>
                <div className="text-white me-3 d-none d-lg-block">
                  Hola! {user.userName}, estás logeado como: {userRole}
                </div>
                <Button
                  variant="outline-primary"
                  className="me-2 mb-2 mb-lg-0 btn-sm"
                  style={{ maxWidth: "140px" }}
                  onClick={logout}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-primary"
                  className="me-2 mb-2 mb-lg-0 btn-sm"
                  style={{ maxWidth: "140px" }}
                  onClick={handleLoginClick}
                >
                  Iniciar sesión
                </Button>
                <Button
                  variant="primary"
                  className="btn-sm"
                  style={{ maxWidth: "140px" }}
                  onClick={handleRegisterClick}
                >
                  Registrarse
                </Button>
              </>
            )}
            <Button
              onClick={handleCartClick}
              style={{
                backgroundColor: "yellow",
                color: "black",
                borderRadius: "50%",
                width: "50px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
