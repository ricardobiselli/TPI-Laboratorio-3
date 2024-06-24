import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Products from "./components/ProductList/ProductList";
import AddProductForm from "./components/AddProduct/AddProduct";
import Clients from "./components/ClientsList/ClientsList";
import Admins from "./components/AdminsList/AdminsList";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import PcBuilder from "./components/PcBuilder/PcBuilder";

function App() {
  const [isLogged, setIsLogged] = useState(false); //ESTABLECE SI ESTÁ LOGEADO O NO

  const stateLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  // PARA BÚSQUEDA DE PRODUCTOS, SE DEBE CONECTAR CON EL MAP QUE MUESTRA LOS PRODUCTOS AL HOME
  const onSearchSavedProduct = (data) => {
    const filteredProduct = product.filter((p) =>
      p.name.toLowerCase().includes(data.toLowerCase())
    );
    setProduct(filteredProduct);
  };

  return (
    <div>
      <BrowserRouter>
        <Header
          isLogged={isLogged}
          onLogout={handleLogout}
          onSearchSaved={onSearchSavedProduct}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pc-builder" element={<PcBuilder />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/add-product-form" element={<AddProductForm />} />{" "}
          {/* boton temporal, solo debe ser visible para el admin */}
          <Route path="/clients" element={<Clients />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
