import "./Button.css";

export default function Button({ label, onClick, type = "button", variant = "primary", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}