import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "../components/LoginCard/registerCard";
import Input from "../components/input/input";
import Button from "../components/Button/Button";
import api from "../services/api.js";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !senha) {
      alert("Preencha o e-mail e a senha!");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        senha,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/home");

    } catch (error) {
      alert(error.response?.data?.message || "Login inválido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f6fa",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <LoginCard title="Faça seu login para entrar na plataforma">

        <Input
          label="E-mail:"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
        />

        <Input
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
        />

        <p style={{
          fontSize: 13,
          color: "#f97316",
          cursor: "pointer",
          marginBottom: 8,
        }}>
          Esqueci a senha
        </p>

        <Button
          label={loading ? "Entrando..." : "Entrar"}
          onClick={handleSubmit}
          disabled={loading}
          variant="primary"
        />

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          margin: "16px 0 8px",
        }}>
          <span style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          <span style={{ fontSize: 12, color: "#9ca3af" }}>Criar conta</span>
          <span style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
        </div>

        <div style={{ textAlign: "center" }}>
          <span
            style={{
              fontSize: 13,
              color: "#1e2a4a",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/cadastro")}
          >
            Cadastre-se
          </span>
        </div>

      </LoginCard>
    </div>
  );
}