function FormField({ label, children, className }) {
  return (
    <label className={className}>
      <span>{label}</span>
      {children}
    </label>
  );
}

export default FormField;
