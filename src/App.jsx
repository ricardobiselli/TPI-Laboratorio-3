import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import PcBuilder from "./components/PcBuilder/PcBuilder";
import Home from "./components/Home/Home";
import Products from "./components/ProductList/ProductList";
import AddProductForm from "./components/AddProduct/AddProduct";
import Clients from "./components/ClientsList/ClientsList"
import Admins from "./components/AdminsList/AdminsList"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { useState } from "react";
import ProductSearch from "./components/ProductSearch/ProductSearch";

function App() {

  const [searchProduct, setSearchProduct] = useState("");

  const onSearchSavedProduct = (product) => {
    setSearchProduct(product);
  }

  return (
    <div>
      <BrowserRouter>
        <Header onSearchSaved={onSearchSavedProduct} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pc-builder" element={<PcBuilder />} />
          <Route path="/Products" element={<Products />}/>
          <Route path="/add-product-form" element={<AddProductForm />} /> {/* boton temporal, solo debe ser visible para el admin */}
          <Route path="/clients" element ={<Clients/>}/>
          <Route path="/admins" element={<Admins/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/shopping-cart" element={<ShoppingCart/>}/>
          <Route path="/product-search" element={<ProductSearch searchProduct={searchProduct}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
