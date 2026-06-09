export default function Message({ texto, usuario }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          usuario === "Você" ? "flex-end" : "flex-start",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          background:
            usuario === "Você"
              ? "#4caf50"
              : "#e0e0e0",
          color:
            usuario === "Você"
              ? "#fff"
              : "#000",
          padding: "10px",
          borderRadius: "10px",
          maxWidth: "300px",
        }}
      >
        <strong>{usuario}</strong>

        <p>{texto}</p>
      </div>
    </div>
  );
}