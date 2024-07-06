import { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../api/ApiConnection';
import { Container, Card, Button, Modal, Form, Alert, Row, Col } from 'react-bootstrap';

const initialProductState = {
  name: '',
  category: '',
  description: '',
  price: 0,
  stockQuantity: 0,
  powerConsumption: 0
};

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  const [modalMode, setModalMode] = useState("add");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.$values || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleOpenModal = (mode, product = null) => {
    setModalMode(mode);
    setCurrentProduct(product || initialProductState);
    setShowModal(true);
    setError("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (isFormValid()) {
      try {
        if (modalMode === "add") {
          await addProduct(currentProduct);
        } else {
          await updateProduct(currentProduct.id, currentProduct);
        }
        await fetchProducts();
        handleCloseModal();
      } catch (error) {
        console.error("Error saving product:", error);
        setError("Error saving product. Please try again.");
      }
    } else {
      setError('All fields must be filled out, no negative numbers allowed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        await fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const isFormValid = () => {
    return (
      currentProduct.name &&
      currentProduct.category &&
      currentProduct.description &&
      currentProduct.price > 0 && 
      currentProduct.stockQuantity >= 0 &&
      currentProduct.powerConsumption >= 0 
    );
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Administrar Productos</h1>
      <Button variant="success" className="mb-3" onClick={() => handleOpenModal("add")}>
        Agregar Producto
      </Button>

      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Precio: ${product.price}</Card.Text>
                <Card.Text>Stock: {product.stockQuantity} units</Card.Text>
                <Card.Text>Consumo: {product.powerConsumption} Watts</Card.Text>
                <Button variant="outline-primary" onClick={() => handleOpenModal("edit", product)}>Editar</Button>
                <Button variant="outline-danger" className="ms-2" onClick={() => handleDelete(product.id)}>Borrar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === "add" ? "Agregar Producto" : "Editar Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            {Object.keys(initialProductState).map(key => (
              <Form.Group key={key} controlId={`form${key}`}>
                <Form.Label>{key}</Form.Label>
                <Form.Control
                  type={key === "description" ? "textarea" : "text"}
                  name={key}
                  value={currentProduct[key] || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductManager;