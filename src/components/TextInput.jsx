function TextInput({
  label,
  type = 'text',
  value,
  onChange,
  name,
  placeholder,
  className = 'input-group',
  ...inputProps
}) {
  return (
    <label className={className}>
      <span>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...inputProps}
      />
    </label>
  );
}

export default TextInput;
