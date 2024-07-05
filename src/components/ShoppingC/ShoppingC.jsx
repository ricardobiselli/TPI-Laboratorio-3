import { useEffect, useState, useContext } from 'react';
import { ListGroup, Button, Row, Col, Badge, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProductById, updateProduct, createOrder } from '../../api/ApiConnection';
import { getCart, removeFromCart, clearCart } from '../../utils/cart';
import AuthContext from '../../services/authentication/AuthContext';

const ShoppingC = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const { user, userRole } = useContext(AuthContext);

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
            console.log('User:', user);
            console.log('Cart:', cart);
            const orderData = {
                totalAmount: total,
                clientId: user.sub, 
                productIds: cart.map(product => product.id)
            };
            console.log('Order Data:', orderData);

            const orderResponse = await createOrder(orderData);
            console.log('Order Response:', orderResponse);

            for (const cartItem of cart) {
                console.log('Processing cart item:', cartItem);
                const product = await getProductById(cartItem.id);
                console.log('Fetched product:', product);

                const updatedStock = product.stockQuantity - cartItem.stockQuantity;
                console.log('Updated Stock:', updatedStock);

                if (updatedStock < 0) {
                    alert(`No hay suficiente stock para ${product.name}`);
                    return;
                }

                const updatedProduct = { ...product, stockQuantity: updatedStock };
                console.log('Updated Product:', updatedProduct);

                const updateResponse = await updateProduct(product.id, updatedProduct);
                console.log('Update Response:', updateResponse);
            }

            alert('Compra finalizada con éxito');
            clearCart();
            setCart([]);
            navigate('/');
        } catch (error) {
            console.error('Error al finalizar la compra:', error);
            alert('Error al finalizar la compra, por favor intenta de nuevo');
        }
    };

    const onContinueShopping = () => {
        navigate('/products');
    };

    const handleClearCart = () => {
        clearCart();
        setCart([]);
    };
    if (!user || (userRole !== "client" )) {
        return (
          <Container>
            <Alert variant="danger">
            Access denied! You are not allowed to view this page. Returning to Home page!
            </Alert>
          </Container>
        );
      }
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div className="w-100" style={{ maxWidth: '600px' }}>
                <h2 className="text-center">Tu carrito</h2>
                {cart.length === 0 ? (
                    <p className="text-center">No hay productos en el carrito.</p>
                ) : (
                    <>
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
                        <Button variant="danger" onClick={handleClearCart} className="mb-3">
                            Eliminar todos
                        </Button>
                    </>
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

export default ShoppingC;
