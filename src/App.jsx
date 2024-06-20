import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/login/Login";
import { useState } from "react";
import Register from "./components/register/Register";


function App() {

  const [isLogged, setIsLogged] = useState(false);

  const stateLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };


  const onSearchSavedProduct = (data) => {
    const filteredProduct = product.filter((p) =>
      p.name.toLowerCase().includes(data.toLowerCase())
    );
    setProduct(filteredProduct);
  };

  return (
    <div>
      <BrowserRouter>
        <Header isLogged={isLogged} onLogout={handleLogout} onSearchSaved={onSearchSavedProduct} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login isLoggin={stateLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;