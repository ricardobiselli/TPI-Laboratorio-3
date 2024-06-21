import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Row, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../../api/ApiConnection';
import { getCart, removeFromCart, clearCart } from '../../utils/cart';

const ShoppingCart = () => {

    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setCart(getCart());
    }, []);

    const total = cart.reduce((sum, product) => sum + product.price * product.stock, 0);

    const handleRemoveFromCart = (productId) => {
        const updatedCart = removeFromCart(productId);
        setCart(updatedCart);
    };

    const onCheckout = async () => {
        try {
            for (const cartItem of cart) {
                const product = await getProductById(cartItem.id);
                const updatedStock = product.stock - cartItem.stock;

                if (updatedStock < 0) {
                    alert(`No hay suficiente stock para ${product.name}`);
                    return;
                }

                const updatedProduct = { ...product, stock: updatedStock };
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

    return (
        <div>
            <h2>Tu carrito</h2>
            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <ListGroup>
                    {cart.map((product) => (
                        <ListGroup.Item key={product.id}>
                            <Row>
                                <Col>{product.name}</Col>
                                <Col>${product.price}</Col>
                                <Col>
                                    <Badge bg="secondary">{product.stock}</Badge>
                                </Col>
                                <Col>
                                    <Button variant="danger" onClick={() => handleRemoveFromCart(product.id)}>
                                        Eliminar
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
            <h3 className="mt-3">Total: ${total.toFixed(2)}</h3>
            <Button variant="success" className="mt-3" onClick={onCheckout}>
                Finalizar compra
            </Button>
        </div>
    );
};

export default ShoppingCart;