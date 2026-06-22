import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/Sidebar";
import Card from "../components/Cards/Card";
import Button from "../components/Button/Button";
import Input from "../components/input/input.jsx";
import api from "../services/api";

const AlterarSenha = () => {
  const navigate = useNavigate();
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleSalvar = async () => {
    setErro("");
    setSucesso("");

    if (!senhaAntiga || !senhaNova || !repetirSenha) {
      setErro("Preencha todos os campos.");
      return;
    }
    if (senhaNova !== repetirSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    if (senhaNova.length < 6) {
      setErro("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setSalvando(true);
    try {
      await api.put("/user/me/senha", { senhaAntiga, senhaNova });
      setSucesso("Senha alterada com sucesso!");
      setSenhaAntiga("");
      setSenhaNova("");
      setRepetirSenha("");
    } catch (e) {
      setErro(e.response?.data?.mensagem || "Erro ao alterar senha.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="editar-perfil-page">
      <Header />
      <Sidebar />
      <main className="editar-perfil-page__content">
        <h1 className="editar-perfil-page__title">
          <button onClick={() => navigate(-1)} className="back-btn">‹</button>
          Meu Perfil
        </h1>

        <Card className="editar-perfil-page__card">
          <h2 className="editar-perfil-page__form-title">Editar Senha</h2>

          <div className="editar-perfil-page__row">
            <span className="editar-perfil-page__field-label">Senha antiga</span>
            <Input
              type="password"
              value={senhaAntiga}
              onChange={(e) => setSenhaAntiga(e.target.value)}
            />
          </div>

          <div className="editar-perfil-page__row">
            <span className="editar-perfil-page__field-label">Senha nova</span>
            <Input
              type="password"
              value={senhaNova}
              onChange={(e) => setSenhaNova(e.target.value)}
            />
          </div>

          <div className="editar-perfil-page__row">
            <span className="editar-perfil-page__field-label">Repetir senha</span>
            <Input
              type="password"
              value={repetirSenha}
              onChange={(e) => setRepetirSenha(e.target.value)}
            />
          </div>

          {erro && <p style={{ color: "red", fontSize: 13, marginTop: 8 }}>{erro}</p>}
          {sucesso && <p style={{ color: "green", fontSize: 13, marginTop: 8 }}>{sucesso}</p>}

          <div className="editar-perfil-page__acoes">
            <Button variant="secondary" onClick={() => navigate(-1)}>Cancelar</Button>
            <Button variant="primary" onClick={handleSalvar} disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AlterarSenha;