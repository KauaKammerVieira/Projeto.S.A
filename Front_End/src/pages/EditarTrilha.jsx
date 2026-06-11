import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/Sidebar";
import Card from "../components/Cards/Card";
import Button from "../components/Button/Button";
import PageTitle from "../components/PageTitle/PageTitle";
import Selects from "../components/Select/Selects";
import "./EditarTrilha.css";

const areasOptions = [
  { value: "logica", label: "Lógica de programação" },
  { value: "frontend", label: "Front-end" },
  { value: "backend", label: "Back-end" },
  { value: "dados", label: "Dados" },
];

const EditarTrilha = () => {
  const [area, setArea] = useState("logica");
  const [nivel, setNivel] = useState("");

  const handleSalvar = () => {
    console.log({ area, nivel });
    alert("Trilha salva com sucesso!");
  };

  return (
    <div className="editar-trilha-page">
      <Header />
      <Sidebar />
      <main className="editar-trilha-page__content">
        <PageTitle title="Minha trilha" backTo="/trilhas" />

        <div className="editar-trilha-page__grid">
          <Card>
            <h2 className="editar-trilha-page__section-title">
              Área de Aprendizado
              <Button variant="primary">Adicionar Nova</Button>
            </h2>

            <div className="editar-trilha-page__field">
              <Selects
                label="Campo de seleção"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                options={areasOptions}
              />
            </div>

            <div className="editar-trilha-page__field">
              <p className="editar-trilha-page__label">Nível de Conhecimento</p>
              <Button variant="primary">Adicionar Nível</Button>

              <div className="editar-trilha-page__nivel-btns">
                {["Iniciante", "Intermediário", "Avançado"].map((n) => (
                  <button
                    key={n}
                    onClick={() => setNivel(n)}
                    className={`nivel-btn ${nivel === n ? "nivel-btn--ativo" : ""}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="editar-trilha-page__card-title">Mentoria IA</h3>
            <p>Precisa de ajuda?</p>
            <Button variant="outline">Falar com a mentoria IA</Button>
          </Card>
        </div>

        <div className="editar-trilha-page__acoes">
          <Button variant="secondary">Voltar</Button>
          <Button variant="primary" onClick={handleSalvar}>Salvar</Button>
        </div>
      </main>
    </div>
  );
};

export default EditarTrilha;