import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail, registerWithEmail } from '../firebaseAuth.js';
import Button from '../components/Button.jsx';
import TextInput from '../components/TextInput.jsx';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Wystąpił błąd przy logowaniu.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-header">
          <span className="eyebrow">Access</span>
          <h1>{isRegister ? 'Utwórz konto' : 'Zaloguj się'}</h1>
          <p>Wprowadź dane użytkownika, aby kontynuować do panelu raportów.</p>
        </div>
        <form className="auth-form" onSubmit={submitForm}>
          <TextInput
            label="Adres e-mail"
            type="email"
            value={email}
            name="email"
            placeholder="twoj@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="Hasło"
            type="password"
            value={password}
            name="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="error-message">{error}</div>}
          <Button type="submit">{isRegister ? 'Zarejestruj się' : 'Zaloguj się'}</Button>
          <button
            type="button"
            className="text-button"
            onClick={() => setIsRegister((prev) => !prev)}
          >
            {isRegister ? 'Masz już konto? Zaloguj się' : 'Nie masz konta? Zarejestruj się'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
