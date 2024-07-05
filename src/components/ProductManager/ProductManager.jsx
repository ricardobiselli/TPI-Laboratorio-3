import { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../api/ApiConnection';
import { Container, Card, ListGroup, Button, Modal, Form, Alert } from 'react-bootstrap';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    powerConsumption: 0
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      console.log('Fetched products:', data);
      setProducts(data.$values || []);
    } catch (error) {
      console.error('Fetch products failed:', error);
    }
  };

  const handleAddProduct = async () => {
    if (isFormValid()) {
      try {
        const newProduct = { ...formData };

        await addProduct(newProduct);
        fetchProducts();
        handleCloseModal();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    } else {
      setError('All fields must be filled out, no negative numbers allowed');
    }
  };

  const handleUpdateProduct = async () => {
    if (isFormValid()) {
      try {
        const updatedProduct = {
          id: selectedProduct.id,
          ...formData
        };

        await updateProduct(selectedProduct.id, updatedProduct);
        fetchProducts();
        handleCloseModal();
      } catch (error) {
        console.error(`Error updating product with ID ${selectedProduct.id}:`, error);
      }
    } else {
      setError('All fields must be filled out, no negative numbers allowed');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      powerConsumption: product.powerConsumption
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setFormData({
      name: '',
      category: '',
      description: '',
      price: 0,
      stockQuantity: 0,
      powerConsumption: 0
    });
    setShowModal(false);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if (name === 'powerConsumption' && parseFloat(value) < 0) {
    //   return; 
    // }

    setFormData({
      ...formData,
      [name]: value
    });
  };

 

  const isFormValid = () => {
    return (
      formData.name &&
      formData.category &&
      formData.description &&
      formData.price > 0 && 
      formData.stockQuantity &&
      formData.powerConsumption >= 0 
    );
  };


  return (
    <Container>
      <h1 className="my-4">Manage Products</h1>
      <Button variant="success" className="mb-3" onClick={() => setShowModal(true)}>Add Product</Button>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-6 col-lg-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Stock: {product.stockQuantity} units</ListGroup.Item>
                <ListGroup.Item>Power Consumption: {product.powerConsumption} Watts</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Button variant="primary" onClick={() => handleViewDetails(product)}>Edit</Button>
                <Button variant="danger" className="ms-2" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formProductCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formProductStock">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formProductPowerConsumption">
              <Form.Label>Power Consumption (Watts)</Form.Label>
              <Form.Control type="number" name="powerConsumption" value={formData.powerConsumption} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          {selectedProduct ?
            <Button variant="primary" onClick={handleUpdateProduct}>Update</Button> :
            <Button variant="success" onClick={handleAddProduct}>Add</Button>
          }
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductManager;
