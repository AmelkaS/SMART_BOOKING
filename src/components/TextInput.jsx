function TextInput({ label, type = 'text', value, onChange, name, placeholder }) {
  return (
    <label className="input-group">
      <span>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}

export default TextInput;
