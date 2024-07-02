import React, { useEffect, useState, useContext } from 'react';
import { ListGroup, Button, Row, Col, Badge, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../../api/ApiConnection';
import { getCart, removeFromCart, clearCart } from '../../utils/cart';
import AuthContext from '../../services/authentication/AuthContext';

const ShoppingCart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setCart(getCart());
    }, []);

    const total = cart.reduce((sum, product) => sum + product.price * product.stockQuantity, 0);

    const handleRemoveFromCart = (productId) => {
        const updatedCart = removeFromCart(productId);
        setCart(updatedCart);
    };

    const onCheckout = async () => {

        if (!user) {
            alert('Es necesario iniciar sesión para finalizar la compra.');
            navigate('/login');
            return;
        }

        if (cart.length === 0) {
            alert('No tiene productos en el carrito para comprar');
            return;
        }
        try {
            for (const cartItem of cart) {
                const product = await getProductById(cartItem.id);
                const updatedStock = product.stockQuantity - cartItem.stockQuantity;

                if (updatedStock < 0) {
                    alert(`No hay suficiente stock para ${product.name}`);
                    return;
                }

                const updatedProduct = { ...product, stockQuantity: updatedStock };
                await updateProduct(product.id, updatedProduct);
            }

            alert('Compra finalizada con éxito');
            clearCart();
            setCart([]);
            navigate('/');
        } catch (error) {
            console.error('Error al actualizar el stock:', error);
            alert('Error al finalizar la compra, por favor intenta de nuevo');
        }
    };

    const onContinueShopping = () => {
        navigate('/products');
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div className="w-100" style={{ maxWidth: '600px' }}>
                <h2 className="text-center">Tu carrito</h2>
                {cart.length === 0 ? (
                    <p className="text-center">No hay productos en el carrito.</p>
                ) : (
                    <ListGroup className="mb-3">
                        {cart.map((product) => (
                            <ListGroup.Item key={product.id}>
                                <Row className="d-flex align-items-center">
                                    <Col>{product.name}</Col>
                                    <Col className="text-end">${product.price}</Col>
                                    <Col className="text-end">
                                        <Badge bg="secondary">{product.stockQuantity}</Badge>
                                    </Col>
                                    <Col className="text-end">
                                        <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(product.id)}>
                                            Eliminar
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
                <h3 className="text-center">Total: ${total.toFixed(2)}</h3>
                <div className="d-flex justify-content-between mt-3">
                    <Button variant="primary" onClick={onContinueShopping}>
                        Continuar comprando
                    </Button>
                    <Button variant="success" onClick={onCheckout}>
                        Finalizar compra
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default ShoppingCart;