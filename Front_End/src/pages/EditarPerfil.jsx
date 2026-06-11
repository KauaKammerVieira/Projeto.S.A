import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/Sidebar";
import Card from "../components/Cards/Card";
import Button from "../components/Button/Button";
import Input from "../components/input/input.jsx";
import Avatar from "../components/Avatars/Avatar";
import "./EditarPerfil.css";

const EditarPerfil = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "João da Silva",
    email: "yourname@gmail.com",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
          <div className="editar-perfil-page__user-info">
            <Avatar src="https://i.pravatar.cc/96" size="lg" editable />
            <div>
              <p className="editar-perfil-page__user-name">{form.nome}</p>
              <p className="editar-perfil-page__user-email">{form.email}</p>
            </div>
          </div>

          <div className="editar-perfil-page__form-section">
            <h2 className="editar-perfil-page__form-title">Editar Perfil</h2>

            <div className="editar-perfil-page__row">
              <span className="editar-perfil-page__field-label">Nome</span>
              <Input
                name="nome"
                value={form.nome}
                onChange={handleChange}
              />
            </div>

            <div className="editar-perfil-page__row">
              <span className="editar-perfil-page__field-label">E-mail</span>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="editar-perfil-page__row">
              <span className="editar-perfil-page__field-label">Senha</span>
              <Button
                variant="outline"
                onClick={() => navigate("/alterar-senha")}
              >
                Alterar Senha
              </Button>
            </div>
          </div>

          <div className="editar-perfil-page__acoes">
            <Button variant="secondary" onClick={() => navigate(-1)}>Cancelar</Button>
            <Button variant="primary">Salvar</Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default EditarPerfil;