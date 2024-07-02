//Funciones del Cart del LocalStorage
//utilizados para el componente de elegir productos al carrito (product list) y en finalizar la compra (shoppingcart)

export const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.stockQuantity += 1;
    } else {
        cart.push({ ...product, stockQuantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCart = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
};

export const removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.map(item => {
        if (item.id === productId) {
            if (item.stockQuantity > 1) {
                return { ...item, stockQuantity: item.stockQuantity - 1 };
            } else {
                return null; 
            }
        }
        return item;
    }).filter(item => item !== null);

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
};

export const clearCart = () => {
    localStorage.removeItem('cart');
};