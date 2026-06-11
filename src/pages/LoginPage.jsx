import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import TextInput from '../components/TextInput.jsx';
import { loginWithEmail, registerWithEmail } from '../firebaseAuth.js';

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
    <div className="page auth-page">
      <section className="auth-panel" aria-labelledby="auth-heading">
        <div className="auth-header">
          <span className="auth-brand">SmartBooking</span>
          <h1 id="auth-heading">{isRegister ? 'Utwórz konto' : 'Zaloguj się'}</h1>
          <p>
            {isRegister
              ? 'Załóż konto, aby rezerwować sale i śledzić swoje zgłoszenia.'
              : 'Zaloguj się, aby przejść do panelu rezerwacji sal.'}
          </p>
        </div>

        <form className="auth-form" onSubmit={submitForm}>
          <TextInput
            className="auth-field"
            label="Adres e-mail"
            type="email"
            name="email"
            value={email}
            placeholder="twoj@mail.com"
            autoComplete="email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />

          <TextInput
            className="auth-field"
            label="Hasło"
            type="password"
            name="password"
            value={password}
            placeholder="••••••••"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            required
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && <div className="error-message">{error}</div>}

          <Button type="submit" className="auth-submit-button">
            {isRegister ? 'Zarejestruj się' : 'Zaloguj się'}
          </Button>
          <Button
            type="button"
            className="auth-switch-button"
            onClick={() => setIsRegister((prev) => !prev)}
          >
            {isRegister ? 'Masz już konto? Zaloguj się' : 'Nie masz konta? Zarejestruj się'}
          </Button>
        </form>
      </section>
    </div>
  );
}

export default LoginPage;
