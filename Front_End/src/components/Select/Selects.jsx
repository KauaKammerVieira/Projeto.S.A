import "./Select.css";

export default function Selects({ label, value, onChange, options = [] }) {
  return (
    <div className="select-group">
      {label && <label className="select-group__label">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="select-group__field"
      >
        {options.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
    </div>
  );
}