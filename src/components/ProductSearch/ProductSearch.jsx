import { useEffect, useState } from 'react';
import { getProducts } from '../../api/ApiConnection';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import { addToCart } from '../../utils/cart';
import PropTypes from "prop-types";

const ProductSearch = ({ searchProduct }) => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data.$values || []);
            } catch (error) {
                console.error('fetch products failed!!!', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchProduct) {
            const filtered = products.filter((p) =>
                p.name.toLowerCase().includes(searchProduct.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [searchProduct, products]);

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
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
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
                    ))
                ) : (
                    <div className="col-12">
                        <h3>Producto no encontrado</h3>
                    </div>
                )}
            </div>
        </Container>
    );
};

ProductSearch.propTypes = {
    searchProduct: PropTypes.string,
};

export default ProductSearch;