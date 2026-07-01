import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/Sidebar";
import Button from "../components/Button/Button";
import Card from "../components/Cards/Card";
import PageTitle from "../components/PageTitle/PageTitle";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import api from "../services/api";

const AvaliacaoNivel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const area = location.state?.area || "Lógica de programação";

  const [questoes, setQuestoes] = useState([]);
  const [atual, setAtual] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [selecionada, setSelecionada] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [iniciada, setIniciada] = useState(false);
  const [finalizada, setFinalizada] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");

  const iniciarAvaliacao = async () => {
    setCarregando(true);
    setErro("");
    try {
      const res = await api.post("/trilhas/avaliacao", { area });
      setQuestoes(res.data.questoes);
      setIniciada(true);
    } catch (e) {
      setErro("Erro ao gerar avaliação. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  const handleProximo = async () => {
    if (selecionada === null) return;

    const novasRespostas = [
      ...respostas,
      {
        pergunta: questoes[atual].pergunta,
        respondida: questoes[atual].alternativas[selecionada],
        correta: questoes[atual].respostaCorreta,
      },
    ];
    setRespostas(novasRespostas);
    setSelecionada(null);

    if (atual + 1 < questoes.length) {
      setAtual(atual + 1);
    } else {
      setCarregando(true);
      try {
        const res = await api.post("/trilhas/avaliacao/responder", {
          area,
          respostas: novasRespostas,
        });
        setResultado(res.data);
        setFinalizada(true);
      } catch (e) {
        setErro("Erro ao enviar respostas. Tente novamente.");
      } finally {
        setCarregando(false);
      }
    }
  };

  const handleVoltar = () => {
    if (atual > 0) {
      setAtual(atual - 1);
      setSelecionada(null);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="editar-perfil-page">
      <Header />
      <Sidebar />
      <main className="editar-perfil-page__content">
        <PageTitle title="Avaliação de Nível" backTo="/trilhas" />

        {!iniciada && !finalizada && (
          <Card>
            <h2>Avaliação de Nível — {area}</h2>
            <p style={{ color: "var(--color-text-secondary)", margin: "12px 0 24px" }}>
              A avaliação de nível serve para entender seu nível atual de conhecimento
              e personalizar sua jornada de aprendizado.
            </p>
            {erro && <p style={{ color: "red", fontSize: 13 }}>{erro}</p>}
            <Button variant="primary" onClick={iniciarAvaliacao} disabled={carregando}>
              {carregando ? "Gerando avaliação..." : "Iniciar Avaliação"}
            </Button>
          </Card>
        )}

        {iniciada && !finalizada && questoes.length > 0 && (
          <Card>
            <p style={{ color: "var(--color-text-secondary)", fontSize: 13, marginBottom: 8 }}>
              A avaliação de nível serve para entender seu nível atual de conhecimento
              e personalizar sua jornada de aprendizado.
            </p>

            <ProgressBar atual={atual + 1} total={questoes.length} />

            <QuestionCard
              pergunta={questoes[atual].pergunta}
              nivel={questoes[atual].nivel || "Iniciante"}
              alternativas={questoes[atual].alternativas}
              selecionada={selecionada}
              onSelecionar={(i) => setSelecionada(i)}
            />

            {erro && <p style={{ color: "red", fontSize: 13, marginTop: 8 }}>{erro}</p>}

            <div className="editar-perfil-page__acoes" style={{ marginTop: 16 }}>
              <Button variant="secondary" onClick={handleVoltar}>Voltar</Button>
              <Button
                variant="primary"
                onClick={handleProximo}
                disabled={selecionada === null || carregando}
              >
                {carregando ? "Enviando..." : atual + 1 === questoes.length ? "Finalizar" : "Próximo"}
              </Button>
            </div>
          </Card>
        )}

        {finalizada && resultado && (
          <Card>
            <h2>Resultado da Avaliação</h2>
            <p style={{ margin: "12px 0 8px" }}>
              Pontuação: <strong>{resultado.avaliacao.pontuacao}/10</strong>
            </p>
            <p>
              Nível identificado: <strong>{resultado.avaliacao.nivelAtual}</strong>
            </p>
            <p style={{ margin: "8px 0 24px", color: "var(--color-text-secondary)" }}>
              Sua trilha personalizada foi criada com sucesso!
            </p>
            <div className="editar-perfil-page__acoes">
              <Button variant="primary" onClick={() => navigate("/trilhas")}>
                Ver Minhas Trilhas
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AvaliacaoNivel;