import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7069/api', //URL del back en .NET
});


// Endpoints:
export const getClient = async () => {
    const response = await api.get('/Clients'); //todos los clientes
    return response.data;
};

export const getClientById = async (id) => {
    const response = await api.get(`/Clients/${id}`); //GetbyId
    return response.data;
};

export const addClient = async (clientObject) => {//agregar cliente
    try {
        const response = await api.post('/Clients/register', clientObject);
        return response.data;
    } catch (error) {
        console.error('Error adding client:', error);
        throw error;
    }
};