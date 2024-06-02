import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7069/api', //URL del back en .NET
});


// Endpoints:
export const getProducts = async () => {
    const response = await api.get('/product'); //todos los productos
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/product/${id}`); //GetbyId
    return response.data;
};