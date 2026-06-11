function Button({ children, type = 'button', variant = 'primary', onClick, disabled, className }) {
  return (
    <button
      type={type}
      className={className || `button button-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
