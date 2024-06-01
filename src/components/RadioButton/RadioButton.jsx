export const RadioButton = ({ id, name, value, checked, label, onChange }) => (
  <div className="radio">
    <input
      className="radioInput"
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <label className="radioLabel" htmlFor={id}>
      {label}
    </label>
  </div>
);
