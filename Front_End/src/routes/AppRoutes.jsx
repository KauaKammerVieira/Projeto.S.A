import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home";
import ChatPage from "../pages/ChatPage";
import EditarTrilha from "../pages/EditarTrilha";
import EditarPerfil from "../pages/EditarPerfil";
import AlterarSenha from "../pages/AlterarSenha";
import VerificarNivel from "../pages/VerificarNivel";
import Trilhas from "../pages/Trilhas";
import AvaliacaoNivel from "../pages/AvaliacaoNivel"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/trilhas" element={<Trilhas />} />
        <Route path="/editar-trilha" element={<EditarTrilha />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/alterar-senha" element={<AlterarSenha />} />
        <Route path="/verificar-nivel" element={<VerificarNivel />} />
        <Route path="/avaliacao-nivel" element={<AvaliacaoNivel />} />
      </Routes>
    </BrowserRouter>
  );
}