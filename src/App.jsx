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
import Login from "./components/login/Login";
import ProtectedRoute from './services/authentication/ProtectedRoute';
import Register from "./components/register/Register";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
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
            <Route path="/pc-builder" element={<PcBuilder />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/add-product-form" element={<ProtectedRoute allowedRoles={['admin', 'superAdmin']}><AddProductForm /></ProtectedRoute>} />
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
            <Route path="/product-search" element={<ProductSearch searchProduct={searchProduct}/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
