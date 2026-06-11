import { useNavigate } from "react-router-dom";
import "./header.css";

export default function Header() {
  const navigate = useNavigate();

  const handleSair = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <button className="header__sair" onClick={handleSair}>
        Sair
      </button>
    </header>
  );
}