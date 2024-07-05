import { Button, Card, Col, ListGroup } from "react-bootstrap";
import { addToCart } from "../../utils/cart";

const ProductCard = ({ product, handleAdd }) => {
  return (
    <Col key={product.id}>
      <Card className="h-100 shadow-sm hover-shadow transition">
        <Card.Header className="bg-light text-center py-3">
          <Card.Title className="mb-0">{product.name}</Card.Title>
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          <Card.Subtitle className="mb-2 text-muted text-center">
            {product.category}
          </Card.Subtitle>
          <Card.Text className="flex-grow-1">{product.description}</Card.Text>
          <ListGroup variant="flush" className="mb-3">
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <strong>Precio:</strong>{" "}
              <span className="text-primary">${product.price.toFixed(2)}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <strong>Stock:</strong>{" "}
              <span>{product.stockQuantity} unidades</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <strong>Consumo:</strong>{" "}
              <span>{product.powerConsumption} Watts</span>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer className="bg-white border-top-0">
          <Button
            variant="primary"
            className="w-100"
            onClick={() => handleAdd(product)}
          >
            Agregar al carrito
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ProductCard;
