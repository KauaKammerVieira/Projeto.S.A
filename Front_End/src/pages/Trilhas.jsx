import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/Sidebar";
import Button from "../components/Button/Button";
import api from "../services/api";

export default function Trilhas() {
  const navigate = useNavigate();
  const [trilhas, setTrilhas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api.get("/trilhas")
      .then((res) => setTrilhas(res.data))
      .catch((err) => console.error("Erro ao buscar trilhas:", err))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div className="home">
      <Header />
      <Sidebar />

      <main className="home__content">
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2>Minhas Trilhas</h2>
            <Button variant="primary" onClick={() => navigate("/editar-trilha")}>
              + Nova Trilha
            </Button>
          </div>

          {carregando ? (
            <p>Carregando suas trilhas...</p>
          ) : trilhas.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: 60 }}>
              <p style={{ marginBottom: 16, color: "#666" }}>
                Você ainda não tem nenhuma trilha. Crie sua primeira!
              </p>
              <Button variant="primary" onClick={() => navigate("/editar-trilha")}>
                Criar Trilha
              </Button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {trilhas.map((trilha) => (
                <div
                  key={trilha.id}
                  style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", width: "300px", backgroundColor: "#fff" }}
                >
                  <h3>{trilha.nome}</h3>
                  <p><strong>Área:</strong> {trilha.area}</p>
                  <p><strong>Nível:</strong> {trilha.nivelAtual}</p>
                  <p><strong>Status:</strong> {trilha.status}</p>
                  <div style={{ marginTop: 12 }}>
                    <Button variant="outline" onClick={() => navigate(`/editar-trilha`, { state: { trilha } })}>
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}