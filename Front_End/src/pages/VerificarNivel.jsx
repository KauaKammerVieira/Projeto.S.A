import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Card from "../components/Cards/Card";
import Button from "../components/Button/Button";
import PageTitle from "../components/PageTitle/PageTitle";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import "./VerificarNivel.css";

const questoes = [
  {
    id: 1, nivel: "Iniciante",
    pergunta: "O que é HTML?",
    alternativas: [
      "Uma linguagem de programação",
      "Uma linguagem de marcação",
      "Um sistema de banco de dados",
    ],
    correta: 1,
  },
  {
    id: 2, nivel: "Iniciante",
    pergunta: "O que é CSS?",
    alternativas: [
      "Uma linguagem de banco de dados",
      "Uma linguagem de estilos",
      "Um framework JavaScript",
    ],
    correta: 1,
  },
];

const VerificarNivel = () => {
  const navigate = useNavigate();
  const [atual, setAtual] = useState(0);
  const [selecionada, setSelecionada] = useState(null);

  const questao = questoes[atual];
  const total = questoes.length;

  const handleProximo = () => {
    if (atual < total - 1) {
      setAtual(atual + 1);
      setSelecionada(null);
    } else {
      alert("Avaliação concluída!");
      navigate("/trilhas");
    }
  };

  const handleVoltar = () => {
    if (atual > 0) {
      setAtual(atual - 1);
      setSelecionada(null);
    }
  };

  return (
    <div className="verificar-nivel-page">
      <Header />
      <Sidebar />
      <main className="verificar-nivel-page__content">
        <PageTitle title="Avaliação de Nível" backTo="/" />

        <p className="verificar-nivel-page__descricao">
          A avaliação de nível serve para entender o seu nível atual de
          conhecimento e personalizar sua jornada de aprendizado.
        </p>

        <ProgressBar atual={atual + 1} total={total} />

        <Card className="verificar-nivel-page__card">
          <QuestionCard
            pergunta={questao.pergunta}
            nivel={questao.nivel}
            alternativas={questao.alternativas}
            selecionada={selecionada}
            onSelecionar={setSelecionada}
          />

          <div className="verificar-nivel-page__nav">
            <Button variant="secondary" onClick={handleVoltar} disabled={atual === 0}>
              Voltar
            </Button>
            <Button variant="primary" onClick={handleProximo} disabled={selecionada === null}>
              Próximo
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default VerificarNivel;