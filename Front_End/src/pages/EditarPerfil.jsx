import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/Sidebar";
import Card from "../components/Cards/Card";
import Button from "../components/Button/Button";
import Input from "../components/input/input.jsx";
import Avatar from "../components/Avatars/Avatar";
import api from "../services/api";
import "./EditarPerfil.css";

const EditarPerfil = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    api.get("/user/me")
      .then((res) => setForm({ nome: res.data.nome, email: res.data.email }))
      .catch(() => setErro("Não foi possível carregar o perfil."))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErro("");
    setSucesso("");
  };

  const handleSalvar = async () => {
    setSalvando(true);
    setErro("");
    try {
      await api.put("/user/me", form);
      setSucesso("Perfil atualizado com sucesso!");
    } catch (e) {
      setErro(e.response?.data?.mensagem || "Erro ao salvar. Tente novamente.");
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

        {loading ? <p>Carregando...</p> : (
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
                <Input name="nome" value={form.nome} onChange={handleChange} />
              </div>

              <div className="editar-perfil-page__row">
                <span className="editar-perfil-page__field-label">E-mail</span>
                <Input name="email" type="email" value={form.email} onChange={handleChange} />
              </div>

              <div className="editar-perfil-page__row">
                <span className="editar-perfil-page__field-label">Senha</span>
                <Button variant="outline" onClick={() => navigate("/alterar-senha")}>
                  Alterar Senha
                </Button>
              </div>
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
        )}
      </main>
    </div>
  );
};

export default EditarPerfil;