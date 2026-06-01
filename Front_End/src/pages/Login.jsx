import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/header";
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
  setLoading(true);

  try {
    const response = await api.post("/auth/login", {
      email,
      senha,
    });

    console.log(response.data);

    // salva token
    localStorage.setItem(
      "token",
      response.data.token
    );

    navigate("/home");
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Login inválido"
    );
  } finally {
    setLoading(false);
  }
}
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <Header />

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

        <p
          style={{
            fontSize: 13,
            color: "#2563eb",
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          Esqueci a senha
        </p>

        <Button
          label={loading ? "Entrando..." : "Entrar"}
          onClick={handleSubmit}
          disabled={loading}
          variant="primary"
        />

        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
            color: "#aaa",
          }}
        >
          ——————— Criar conta ———————
        </div>

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <span
            style={{
              fontSize: 13,
              color: "#2563eb",
              cursor: "pointer",
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