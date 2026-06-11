import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/Sidebar";
import Card from "../components/Cards/Card";
import Button from "../components/Button/Button";
import Input from "../components/input/input";
import Avatar from "../components/Avatars/Avatar";
import "./AlterarSenha.css";

const AlterarSenha = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSalvar = () => {
    if (form.novaSenha !== form.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    alert("Senha alterada com sucesso!");
    navigate("/perfil");
  };

  return (
    <div className="alterar-senha-page">
      <Header />
      <Sidebar />
      <main className="alterar-senha-page__content">
        <h1 className="alterar-senha-page__title">
          <button onClick={() => navigate(-1)} className="back-btn">‹</button>
          Meu Perfil
        </h1>

        <Card className="alterar-senha-page__card">
          <div className="alterar-senha-page__user-info">
            <Avatar src="https://i.pravatar.cc/96" size="lg" editable />
            <p className="alterar-senha-page__user-email">yourname@gmail.com</p>
          </div>

          <div className="alterar-senha-page__form-section">
            <h2 className="alterar-senha-page__form-title">Editar Senha</h2>

            <div className="alterar-senha-page__row">
              <span className="alterar-senha-page__field-label">Senha antiga</span>
              <Input
                name="senhaAtual"
                type="password"
                value={form.senhaAtual}
                onChange={handleChange}
                placeholder="••••••••••"
              />
            </div>

            <div className="alterar-senha-page__row">
              <span className="alterar-senha-page__field-label">Senha nova</span>
              <Input
                name="novaSenha"
                type="password"
                value={form.novaSenha}
                onChange={handleChange}
              />
            </div>

            <div className="alterar-senha-page__row">
              <span className="alterar-senha-page__field-label">Repetir senha</span>
              <Input
                name="confirmarSenha"
                type="password"
                value={form.confirmarSenha}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="alterar-senha-page__acoes">
            <Button variant="secondary" onClick={() => navigate(-1)}>Cancelar</Button>
            <Button variant="primary" onClick={handleSalvar}>Salvar</Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AlterarSenha;