import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7069/api", //URL del back en .NET
});

// Endpoints:
export const getProducts = async () => {
  const response = await api.get("/products"); //todos los productos
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`); //GetbyId
  return response.data;
};

export const getClient = async () => {
  const response = await api.get("/Clients"); //todos los clientes
  return response.data;
};

export const getClientById = async (id) => {
  const response = await api.get(`/Clients/${id}`); //GetbyId
  return response.data;
};

export const addClient = async (clientObject) => {
  //agregar cliente
  try {
    const response = await api.post("/Clients/register", clientObject);
    return response.data;
  } catch (error) {
    console.error("Error adding client:", error);
    throw error;
  }
};

export const getClients = async () => {
  const response = await api.get("/clients");
  return response.data;
};

export const getAdmins = async () => {
  const response = await api.get("/admins");
  return response.data;
};
export const updateProduct = async (id, productObject) => {
  //editar Productos
  try {
    const response = await api.put(`/products/${id}`, productObject);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
