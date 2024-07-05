
import api from './AxiosConfig';

export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const addProduct = async (productObject) => {
    try {
        const response = await api.post('/products', productObject);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};
export const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting product with ID ${id}:`, error);
        throw error;
    }
};
export const updateProduct = async (id, updatedData) => {
    try {
        const response = await api.put(`/products/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Error updating product with ID ${id}:`, error);
        throw error;
    }
};

export const getClients = async () => {
    try {
        const response = await api.get('/clients');
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
};

export const addClient = async (clientObject) => {
    try {
        const response = await api.post('/clients/register', clientObject);
        return response.data;
    } catch (error) {
        console.error('Error adding client:', error);
        throw error;
    }
};

export const updateClient = async (id, updatedData) => {
    try {
      console.log(`Sending PUT request to /Clients/${id}`);
      const response = await api.put(`/Clients/${id}`, updatedData);
      console.log('Full API response:', response);
      return response.data;
    } catch (error) {
      console.error(`Error updating client with ID ${id}:`, error);
      throw error;
    }
  };

export const deleteClient = async (id) => {
    try {
        const response = await api.delete(`/clients/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting client with ID ${id}:`, error);
        throw error;
    }
};

export const getAdmins = async () => {
    try {
        const response = await api.get('/admins');
        return response.data;
    } catch (error) {
        console.error('Error fetching admins:', error);
        throw error;
    }
};

export const addAdmin = async (adminObject) => {
    try {
        const response = await api.post('/admins/register', adminObject);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const updateAdmin = async (id, updatedData) => {
    try {
        const response = await api.put(`/admins/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Error updating admin with ID ${id}:`, error);
        throw error;
    }
};

export const deleteAdmin = async (id) => {
    try {
        const response = await api.delete(`/admins/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting admin with ID ${id}:`, error);
        throw error;
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await api.post(`/orders`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const getClientOrders = async (clientId) =>{
    try {
        const response = await api.get(`/orders/${clientId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching orders for client with ID ${clientId}:`, error);
        throw error;
    }
}

export const getAllOrders = async () => {
    try {
        const response = await api.get('/orders');
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};