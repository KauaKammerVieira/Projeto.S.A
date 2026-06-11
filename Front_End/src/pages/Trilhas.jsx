import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Trilhas() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Sidebar />
      <main style={{
        marginLeft: "220px",
        marginTop: "56px",
        padding: "32px",
        background: "#f5f6fa",
        minHeight: "calc(100vh - 56px)"
      }}>
        <h1 style={{ color: "#1e2a4a", fontSize: "1.125rem", fontWeight: 600 }}>
          Minhas Trilhas
        </h1>
        <p style={{ color: "#6b7280", marginTop: "8px" }}>
          Suas trilhas de aprendizado aparecem aqui.
        </p>
      </main>
    </div>
  );
}