import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import PcBuilder from "./components/PcBuilder/PcBuilder";
import Home from "./components/Home/Home";
import Products from "./components/ProductList/ProductList";
import AddProductForm from "./components/AddProduct/AddProduct";
import Clients from "./components/ClientsList/ClientsList"
import Admins from "./components/AdminsList/AdminsList"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pc-builder" element={<PcBuilder />} />
          <Route path="/Products" element={<Products />}/>
          <Route path="/add-product-form" element={<AddProductForm />} /> {/* boton temporal, solo debe ser visible para el admin */}
          <Route path="/clients" element ={<Clients/>}/>
          <Route path="/admins" element={<Admins/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
