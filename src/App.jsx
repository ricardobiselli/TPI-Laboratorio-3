import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import PcBuilder from "./components/PcBuilder/PcBuilder";
import Home from "./components/Home/Home";
import Products from "./components/ProductList/ProductList";
import AddProductForm from "./components/AddProduct/AddProduct";
import Clients from "./components/ClientsList/ClientsList";
import Admins from "./components/AdminsList/AdminsList";
import ProductManager from "./components/ProductManager/ProductManager";
import { AuthProvider } from './services/authentication/AuthContext';
import Login from "./components/Login/Login";
import ProtectedRoute from './services/authentication/ProtectedRoute'; 


function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header />
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

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
