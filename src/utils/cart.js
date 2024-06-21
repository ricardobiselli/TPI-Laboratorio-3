//Funciones del Cart del LocalStorage
//utilizados para el componente de elegir productos al carrito y en finalizar la compra.

export const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCart = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
};

export const removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
};

export const clearCart = () => {
    localStorage.removeItem('cart');
};