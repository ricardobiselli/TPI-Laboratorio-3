import  { useState, useEffect } from 'react';
import axios from 'axios';

const SimulatePurchase = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [clientId, setClientId] = useState(1); // assuming we have a client with id 1

    useEffect(() => {
        axios.get('https://localhost:7069/api/product')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleProductSelection = (product) => {
        setSelectedProducts(prev => [...prev, product]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const order = {
            totalAmount: selectedProducts.reduce((acc, product) => acc + product.price, 0),
            clientId,
            orderProducts: selectedProducts.map(product => ({ productId: product.id }))
        };

        try {
            const response = await axios.post('https://localhost:7069/api/orders', order);
            console.log('Order created successfully:', response.data);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div>
            <h2>Simulate Purchase</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Client ID:
                    <input type="number" value={clientId} onChange={(e) => setClientId(e.target.value)} required />
                </label>
                <div>
                    <h3>Select Products</h3>
                    {products.map(product => (
                        <div key={product.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={product.id}
                                    onChange={() => handleProductSelection(product)}
                                />
                                {product.name} - ${product.price}
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit">Create Order</button>
            </form>
        </div>
    );
};

export default SimulatePurchase;
