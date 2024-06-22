import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/login/Login";
import { useState } from "react";
import Register from "./components/register/Register";
import ShoppingCart from "./components/shoppingCart/ShoppingCart";

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
          <Route path="/login" element={<Login isLoggin={stateLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
