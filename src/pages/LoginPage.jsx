import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
          <label>
            <span>Adres e-mail</span>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="twoj@mail.com"
              autoComplete="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <span>Hasło</span>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="••••••••"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-submit-button">
            {isRegister ? 'Zarejestruj się' : 'Zaloguj się'}
          </button>
          <button
            type="button"
            className="auth-switch-button"
            onClick={() => setIsRegister((prev) => !prev)}
          >
            {isRegister ? 'Masz już konto? Zaloguj się' : 'Nie masz konta? Zarejestruj się'}
          </button>
        </form>
      </section>
    </div>
  );
}

export default LoginPage;
