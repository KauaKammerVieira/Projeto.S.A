import "../components/styles/home.css";
import { useNavigate } from "react-router-dom";


function Home({ onNavigate }) {
     const navigate = useNavigate();
  return (
    <div className="home">
      <header className="home-header">
        <h1>Home</h1>

        <button onClick={() => navigate("/")}>
          Sair
        </button>
      </header>

      <div className="home-content">
        <h2>Bem-vindo ao sistema</h2>
        <p>Login realizado com sucesso.</p>

        <div className="cards">
          <div className="card">
            <h3>Produtos</h3>
            <p>Gerenciar produtos</p>
          </div>

          <div className="card">
            <h3>Usuários</h3>
            <p>Gerenciar usuários</p>
          </div>

          <div className="card">
            <h3>Pedidos</h3>
            <p>Gerenciar pedidos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;