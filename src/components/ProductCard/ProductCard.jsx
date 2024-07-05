import { Button, Card, ListGroup } from "react-bootstrap";
import { addToCart } from "../../utils/cart";

const ProductCard = ({ product, handleAdd }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {product.category}
        </Card.Subtitle>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
        <ListGroup.Item>Stock: {product.stockQuantity} unidades</ListGroup.Item>
        <ListGroup.Item>
          Power Consumption: {product.powerConsumption} Wats
        </ListGroup.Item>
      </ListGroup>
      <Button variant="primary" onClick={() => handleAdd(product)}>
        Agregar al carrito
      </Button>
    </Card>
  );
};

export default ProductCard;
