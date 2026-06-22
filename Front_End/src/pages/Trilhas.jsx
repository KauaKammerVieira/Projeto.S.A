import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Trilhas() {
  const [trilhas, setTrilhas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarTrilhas = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const resposta = await axios.get("http://localhost:3000/trilhas", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTrilhas(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar as trilhas:", erro);
      } finally {
        setCarregando(false);
      }
    };
    carregarTrilhas();
  }, []);

 // ... (mantenha os imports e o useEffect de antes aqui em cima)

  return (
    <div className="home">
      <Header />
      <Sidebar />
      
      <main className="home__content">
        {/* Podemos usar uma div comum aqui ou a home__grid se você quiser */}
        <div style={{ padding: "20px" }}>
          <h2 style={{ marginBottom: "20px" }}>Minhas Trilhas</h2>
          
          {carregando ? (
             <p>Carregando suas trilhas...</p>
          ) : trilhas.length === 0 ? (
            <p>Suas trilhas de aprendizado aparecem aqui. Você ainda não gerou nenhuma trilha.</p>
          ) : (
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {trilhas.map((trilha) => (
                <div key={trilha.id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", width: "300px", backgroundColor: "#fff" }}>
                  <h3>{trilha.nome}</h3>
                  <p><strong>Área:</strong> {trilha.area}</p>
                  <p><strong>Seu Nível:</strong> {trilha.nivelAtual}</p>
                  <p><strong>Status:</strong> {trilha.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}