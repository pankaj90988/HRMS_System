import './FormField.css';

export default function FormField({ label, type = 'text', value, onChange, placeholder, required, as = 'input', options, disabled }) {
  const id = label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className="df-field" htmlFor={id}>
      <span className="df-field__label">{label}</span>
      {as === 'select' ? (
        <select id={id} value={value} onChange={onChange} required={required} disabled={disabled}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea id={id} value={value} onChange={onChange} placeholder={placeholder} required={required} disabled={disabled} rows={3} />
      ) : (
        <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} disabled={disabled} />
      )}
    </label>
  );
}
