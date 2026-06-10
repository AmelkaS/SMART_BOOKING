import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../firebaseAuth.js';

const navItems = [
  { label: 'Strona Główna', to: '/' },
  { label: 'Sale', to: '/' },
  { label: 'Rezerwuj salę', to: '/entries' },
  { label: 'Rezerwacje', to: '/reports' },
  { label: 'Historia rezerwacji', to: '/history' },
  { label: 'Powiadomienia', to: '/notifications' },
  { label: 'Kalendarz', to: '/calendar' },
];

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">SmartBooking</Link>
      </div>
      <nav className="navbar-links">
        {navItems.map((item) => (
          <Link
            key={`${item.label}-${item.to}`}
            to={item.to}
            className="navbar-link"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="navbar-actions">
        {user ? (
          <button className="navbar-action-button" onClick={handleSignOut}>
            Wyloguj
          </button>
        ) : (
          <Link className="navbar-action-button" to="/login">
            Zaloguj
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
