import "./input.css";

export default function Input({ label, type = "text", value, onChange, placeholder, hasError = false }) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${hasError ? "input-error" : ""}`}
      />
    </div>
  );
}