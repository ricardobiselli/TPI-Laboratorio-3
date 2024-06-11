import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { useState } from "react";
import Register from "./components/register/Register";

const data = [{
  email: "luciano@gmail.com",
  password: "123",
  name: "Luciano",
  surname: "Brion",
  birthday: "17/01/1994"
}, {
  email: "pedro@gmail.com",
  password: "111",
  name: "Pedro",
  surname: "Lopez",
  birthday: "01/06/1995"
},
]

function App() {

  const [dataUsers, setDataUsers] = useState(data);
  const [isLogged, setIsLogged] = useState(false);

  const stateLogin = (data) => {
    setIsLogged(data);
  }

  const submitData = (data) => {
    setDataUsers((prev) => [...prev, data]);
  };

  return (
    <div>
      <BrowserRouter>
        <Header isLogged={isLogged} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login baseData={dataUsers} isLoggin={stateLogin} />} />
          <Route path="/register" element={<Register baseData={dataUsers} sendData={submitData}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;