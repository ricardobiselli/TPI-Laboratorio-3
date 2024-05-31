import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import PcBuilder from "./components/PcBuilder/PcBuilder";
import Home from "./components/Home/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pc-builder" element={<PcBuilder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
