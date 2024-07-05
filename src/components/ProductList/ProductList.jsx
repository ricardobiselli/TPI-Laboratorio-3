import { useEffect, useState } from 'react';
import { getProducts } from '../../api/ApiConnection';
import { Container, Card, ListGroup, Button , Row, Col} from 'react-bootstrap';
import { addToCart } from '../../utils/cart';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => { 
      try {
        const data = await getProducts();
        console.log('data', data);
        setProducts(data.$values || []); 
      } catch (error) {
        console.error('fetch products failed!!!', error);
      }
    };

    fetchProducts(); 
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} agregado al carrito`);
  }

  return (
<Container className="py-5">
  <Row xs={1} md={2} lg={3} className="g-4">
    {products.map((product) => (
      <Col key={product.id}>
        <Card className="h-100 shadow-sm hover-shadow transition">
          <Card.Header className="bg-light text-center py-3">
            <Card.Title className="mb-0">{product.name}</Card.Title>
          </Card.Header>
          <Card.Body className="d-flex flex-column">
            <Card.Subtitle className="mb-2 text-muted text-center">{product.category}</Card.Subtitle>
            <Card.Text className="flex-grow-1">{product.description}</Card.Text>
            <ListGroup variant="flush" className="mb-3">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <strong>Precio:</strong> <span className="text-primary">${product.price.toFixed(2)}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <strong>Stock:</strong> <span>{product.stockQuantity} unidades</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <strong>Consumo:</strong> <span>{product.powerConsumption} Watts</span>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
          <Card.Footer className="bg-white border-top-0">
            <Button variant="primary" className="w-100" onClick={() => handleAddToCart(product)}>
              Agregar al carrito
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    ))}
  </Row>
</Container>
)};


export default Products;