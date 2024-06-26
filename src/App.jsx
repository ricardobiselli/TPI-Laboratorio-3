import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { useState } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Products from "./components/ProductList/ProductList";
import AddProductForm from "./components/AddProduct/AddProduct";
import Clients from "./components/ClientsList/ClientsList";
import Admins from "./components/AdminsList/AdminsList";
import ProductManager from "./components/ProductManager/ProductManager";
import { AuthProvider } from './services/authentication/AuthContext';
import Login from "./components/Login/Login";
import ProtectedRoute from './services/authentication/ProtectedRoute';
import Register from "./components/Register/Register";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import PcBuilder from "./components/PcBuilder/PcBuilder";

const App = () => {

  // PARA BÚSQUEDA DE PRODUCTOS, SE DEBE CONECTAR CON EL MAP QUE MUESTRA LOS PRODUCTOS AL HOME
  //const onSearchSavedProduct = (data) => {
  //const filteredProduct = product.filter((p) =>
  //p.name.toLowerCase().includes(data.toLowerCase())
  //);
  //setProduct(filteredProduct);
  //};

  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          {/*onSearchSaved={onSearchSavedProduct}*/}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pc-builder" element={<PcBuilder />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/add-product-form" element={<AddProductForm />} />
            <Route path="/clients" element={<ProtectedRoute allowedRoles={['superadmin']}><Clients /></ProtectedRoute>} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/productmanager" element={<ProtectedRoute allowedRoles={['admin', 'superAdmin']}>
              <ProductManager />
            </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/pc-builder" element={<PcBuilder />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/add-product-form" element={<AddProductForm />} />{" "}
            <Route path="/clients" element={<Clients />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
