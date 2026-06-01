import "./loginCard.css";

export default function LoginCard({ title, children }) {
  return (
    <div className="login-card">
      <p className="login-card-title">{title}</p>
      {children}
    </div>
  );
}