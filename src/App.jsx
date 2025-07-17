import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/Login"
import Painel from "./components/Painel";
import AdicionarRegistro from "./components/AdicionarRegistro"
import EditarRegistro from "./components/EditarRegistro";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="/adicionar" element={<AdicionarRegistro />} />
        <Route path="/editar/:id" element={<EditarRegistro />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App
