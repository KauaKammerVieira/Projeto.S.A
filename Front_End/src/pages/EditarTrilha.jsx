import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/Sidebar";
import Card from "../components/Cards/Card";
import Button from "../components/Button/Button";
import PageTitle from "../components/PageTitle/PageTitle";
import Selects from "../components/Select/Selects";
import api from "../services/api";
import "./EditarTrilha.css";

const areasOptions = [
  { value: "Lógica de programação", label: "Lógica de programação" },
  { value: "Front-end", label: "Front-end" },
  { value: "Back-end", label: "Back-end" },
  { value: "Dados", label: "Dados" },
];

const EditarTrilha = () => {
  const navigate = useNavigate();
  const [area, setArea] = useState("Lógica de programação");
  const [nivel, setNivel] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleSalvar = async () => {
    if (!nivel) {
      setErro("Selecione um nível de conhecimento.");
      return;
    }
    setSalvando(true);
    setErro("");
    setSucesso("");
    try {
      await api.post("/trilhas", { area, nivelAtual: nivel, nome: `Trilha de ${area}`, nivelObjetivo: "Avançado", status: "EM_ANDAMENTO" });
      setSucesso("Trilha salva com sucesso!");
    } catch (e) {
      setErro(e.response?.data?.mensagem || "Erro ao salvar trilha.");
    } finally {
      setSalvando(false);
    }
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
              <Button variant="primary" onClick={() => navigate("/avaliacao-nivel", { state: { area } })}>
                Adicionar Nova
              </Button>
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
              <Button
                variant="primary"
                onClick={() => navigate("/avaliacao-nivel", { state: { area } })}
              >
                Verificar Nível
              </Button>

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

            {erro && <p style={{ color: "red", fontSize: 13, marginTop: 8 }}>{erro}</p>}
            {sucesso && <p style={{ color: "green", fontSize: 13, marginTop: 8 }}>{sucesso}</p>}
          </Card>

          <Card>
            <h3 className="editar-trilha-page__card-title">Mentoria IA</h3>
            <p>Precisa de ajuda?</p>
            <Button variant="outline">Falar com a mentoria IA</Button>
          </Card>
        </div>

        <div className="editar-trilha-page__acoes">
          <Button variant="secondary" onClick={() => navigate(-1)}>Voltar</Button>
          <Button variant="primary" onClick={handleSalvar} disabled={salvando}>
            {salvando ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default EditarTrilha;