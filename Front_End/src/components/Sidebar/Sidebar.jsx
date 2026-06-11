import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

const links = [
  { label: "Início", path: "/home" },
  { label: "Minhas trilhas", path: "/trilhas" },
  { label: "Mentor IA", path: "/chat" },
  { label: "Perfil", path: "/editar-perfil" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__brand-icon">💬</span>
        <span className="sidebar__brand-text">
          Mentor <strong>IA+</strong>
        </span>
      </div>

      <nav className="sidebar__nav">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar__link ${
              location.pathname === link.path ? "sidebar__link--ativo" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}