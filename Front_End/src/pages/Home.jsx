import { useNavigate } from "react-router-dom";
import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/Sidebar";
import Card from "../components/Cards/Card";
import Button from "../components/Button/Button";
import "../components/styles/home.css";

const aulas = [
  { titulo: "Aula: Introdução ao HTML", duracao: "15 min" },
  { titulo: "Aula: Tags HTML", duracao: "25 min" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <Header />
      <Sidebar />

      <main className="home__content">
        <div className="home__grid">

          {/* Card: O que estudar hoje */}
          <Card>
            <h2 className="home__card-title">O que estudar hoje</h2>
            <div className="home__aulas">
              {aulas.map((aula, i) => (
                <div key={i} className="home__aula-item">
                  <div>
                    <p className="home__aula-nome">{aula.titulo}</p>
                    <p className="home__aula-duracao">Duração: {aula.duracao}</p>
                  </div>
                  <Button variant="primary">Assistir Aula</Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Card: Mentoria IA */}
          <Card>
            <h2 className="home__card-title">Mentoria IA</h2>
            <p className="home__mentoria-texto">Precisa de ajuda?</p>
            <Button
              variant="outline"
              onClick={() => navigate("/chat")}
            >
              Falar com a mentoria IA
            </Button>
          </Card>

        </div>
      </main>
    </div>
  );
}