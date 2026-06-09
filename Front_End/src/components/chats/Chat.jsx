import { useState } from "react";
import { FaPaperPlane, FaTrash, FaUser } from "react-icons/fa";
import Message from "./Message.jsx";

export default function Chat() {
  const [texto, setTexto] = useState("");

  const [mensagens, setMensagens] = useState([
    {
      usuario: "Bot",
      texto: "Olá! Seja bem-vindo."
    }
  ]);

  function enviarMensagem() {
    if (!texto.trim()) return;

    setMensagens([
      ...mensagens,
      {
        usuario: "Você",
        texto: texto
      }
    ]);

    setTexto("");
  }

  function limparChat() {
    setMensagens([]);
  }

  return (
    <div
      style={{
        width: "500px",
        margin: "20px auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h2>
        <FaUser /> Chat React
      </h2>

      <div
        style={{
          height: "350px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "15px",
        }}
      >
        {mensagens.map((msg, index) => (
          <Message
            key={index}
            usuario={msg.usuario}
            texto={msg.texto}
          />
        ))}
      </div>

      <input
        type="text"
        placeholder="Digite sua mensagem..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            enviarMensagem();
          }
        }}
        style={{
          width: "70%",
          padding: "10px",
        }}
      />

      <button
        onClick={enviarMensagem}
        style={{
          marginLeft: "10px",
          padding: "10px",
        }}
      >
        <FaPaperPlane />
      </button>

      <button
        onClick={limparChat}
        style={{
          marginLeft: "10px",
          padding: "10px",
        }}
      >
        <FaTrash />
      </button>
    </div>
  );
}