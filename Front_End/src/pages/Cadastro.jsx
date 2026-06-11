import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "../components/LoginCard/registerCard";
import Input from "../components/input/input";
import Button from "../components/Button/Button";
import api from "../services/api.js";

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [senhaError, setSenhaError] = useState(false);

  async function handleCadastrar() {
    if (!nome || !email || !senha || !confirmar) {
      alert("Preencha todos os campos!");
      return;
    }

    if (senha !== confirmar) {
      setSenhaError(true);
      return;
    }

    setSenhaError(false);

    try {
      const response = await api.post("/auth/cadastro", {
        nome,
        email,
        senha,
      });

      alert("Cadastro realizado!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao cadastrar");
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
      <LoginCard title="Faça seu cadastro para utilizar a plataforma">

        <Input
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome completo"
        />

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

        <Input
          label="Confirmar senha"
          type="password"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          placeholder="Confirme a senha"
          hasError={senhaError}
        />

        {senhaError && (
          <p style={{
            color: "#e53e3e",
            fontSize: 12,
            marginTop: -8,
            marginBottom: 12,
          }}>
            As senhas não coincidem.
          </p>
        )}

        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          marginTop: 8,
        }}>
          <Button
            label="Voltar"
            onClick={() => navigate("/")}
            variant="secondary"
          />
          <Button
            label="Cadastrar"
            onClick={handleCadastrar}
            variant="primary"
          />
        </div>

      </LoginCard>
    </div>
  );
}