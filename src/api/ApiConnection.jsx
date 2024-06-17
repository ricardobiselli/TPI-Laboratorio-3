import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7069/api', //URL del back en .NET
});


// Endpoints:
export const getProducts = async () => {
    const response = await api.get('/products'); //todos los productos
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`); //GetbyId
    return response.data;
};

export const addProduct = async (productObject) => {//agregar producto
    try {
        const response = await api.post('/products', productObject);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const getClients = async ()=>{
    const response = await api.get('/clients');
    return response.data;
}