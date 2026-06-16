import { useState } from "react";
import { FaPaperPlane, FaTrash, FaUser } from "react-icons/fa";
import { perguntarGemini } from "../../services/geminiService"; // ✅ caminho correto
import Message from "./Message.jsx";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false); // ✅ estado adicionado
  const [mensagens, setMensagens] = useState([
    { texto: "Olá! Seja bem-vindo.", tipo: "recebida" }
  ]);

  // ✅ Apenas UMA função enviarMensagem (a versão com IA)
  async function enviarMensagem() {
    if (!texto.trim()) return;

    const pergunta = texto;

    setMensagens((prev) => [...prev, { texto: pergunta, tipo: "enviado" }]);
    setTexto("");
    setLoading(true);

    try {
      const respostaIA = await perguntarGemini(pergunta);
      setMensagens((prev) => [...prev, { texto: respostaIA, tipo: "recebida" }]);
    } catch (erro) {
      console.error(erro);
      setMensagens((prev) => [
        ...prev,
        { texto: "Não consegui responder agora. Tente novamente.", tipo: "recebida" }
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function perguntaRapida(pergunta) {
    setLoading(true);
    setMensagens((prev) => [...prev, { texto: pergunta, tipo: "enviado" }]);

    try {
      const resposta = await perguntarGemini(pergunta);
      setMensagens((prev) => [...prev, { texto: resposta, tipo: "recebida" }]);
    } catch (erro) {
      console.error(erro);
    } finally {
      setLoading(false);
    }
  }

  function limparChat() {
    setMensagens([]);
  }

  return (
    <div style={{ width: "500px", margin: "20px auto", border: "1px solid #ddd", borderRadius: "10px", padding: "20px" }}>
      <h2><FaUser /> Chat React</h2>

      <div style={{ height: "350px", overflowY: "auto", border: "1px solid #ccc", padding: "10px", marginBottom: "15px" }}>
        {mensagens.map((msg, index) => (
          <Message key={index} usuario={msg.tipo === "enviado" ? "Você" : "Bot"} texto={msg.texto} />
        ))}
        {loading && <p style={{ color: "gray" }}>Digitando...</p>} {/* ✅ feedback visual */}
      </div>

      <input
        type="text"
        placeholder="Digite sua mensagem..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") enviarMensagem(); }}
        style={{ width: "70%", padding: "10px" }}
      />

      <button onClick={enviarMensagem} disabled={loading} style={{ marginLeft: "10px", padding: "10px" }}>
        <FaPaperPlane />
      </button>

      <button onClick={limparChat} style={{ marginLeft: "10px", padding: "10px" }}>
        <FaTrash />
      </button>
    </div>
  );
}