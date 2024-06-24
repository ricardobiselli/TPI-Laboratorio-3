import { useEffect, useState } from 'react';
import { getProducts } from '../../api/ApiConnection';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
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
    if (product.stockQuantity > 0) {
      addToCart(product);
      alert(`${product.name} agregado al carrito`);
    } else {
      alert(`Lo sentimos, ${product.name} está fuera de stock`);
    }
  }
  
  return (
    <Container>
      <h1 className="my-4">Product List - no login required</h1>
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
                <ListGroup.Item>Stock: {product.stockQuantity} unidades</ListGroup.Item>
                <ListGroup.Item>Power Consumption: {product.powerConsumption} Wats</ListGroup.Item>
              </ListGroup>
              <Button variant="primary" onClick={() => handleAddToCart(product)}>
                Agregar al carrito
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Products;