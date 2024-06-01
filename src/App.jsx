import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/login/Login";
import { useState } from "react";

const data = [{email: "luciano@gmail.com", 
  password: "123"},{
  email: "pedro@gmail.com",
  password: "111"},
]

function App() {

  const [isLogged, setIsLogged] = useState(false)
  
  const stateLogin = (data) => {
    setIsLogged(data);
  }

  return (
    <div>
      <BrowserRouter>
        <Header isLogged={isLogged}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login baseData={data} isLoggin={stateLogin}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;