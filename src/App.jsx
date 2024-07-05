import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Products from "./components/ProductList/ProductList";
import Clients from "./components/ClientsList/ClientsList";
import Admins from "./components/AdminsList/AdminsList";
import ProductManager from "./components/ProductManager/ProductManager";
import { AuthProvider } from './services/authentication/AuthContext';
import Login from "./components/Login/Login";
import ProtectedRoute from './services/authentication/ProtectedRoute';
import Register from "./components/Register/Register";
import ShoppingC from "./components/ShoppingC/ShoppingC";
import PcBuilder from "./components/PcBuilder/PcBuilder";
import ProductSearch from "./components/ProductSearch/ProductSearch";
import { useState } from "react";


const App = () => {

  const [searchProduct, setSearchProduct] = useState("");

  const onSearchSavedProduct = (product) => {
    setSearchProduct(product);
  }

  return (

    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header onSearchSaved={onSearchSavedProduct} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pc-builder" element={<ProtectedRoute allowedRoles={['client']}><PcBuilder /></ProtectedRoute>} />
            <Route path="/Products" element={<Products />} />
            <Route path="/clients" element={<ProtectedRoute allowedRoles={['admin', 'superadmin']}><Clients /></ProtectedRoute>} />
            <Route path="/admins" element={<ProtectedRoute allowedRoles={['superadmin']}><Admins /></ProtectedRoute>} />
            <Route path="/productmanager" element={<ProtectedRoute allowedRoles={['admin', 'superAdmin']}>
              <ProductManager />
            </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<ProtectedRoute allowedRoles={['admin', 'superadmin']}><Clients /></ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
            <Route path="/shopping-cart" element={<ProtectedRoute allowedRoles={['client']}><ShoppingC /></ProtectedRoute>} />
            <Route path="/product-search" element={<ProductSearch searchProduct={searchProduct} />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
