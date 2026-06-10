import { getCurrentUser, logout } from '../firebaseAuth.js';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';

function ProfilePage() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="page page-profile">
      <div className="profile-card">
        <span className="eyebrow">Twój profil</span>
        <h1>Informacje o koncie</h1>
        <div className="profile-details">
          <div>
            <span>Email</span>
            <strong>{user?.email || 'Brak danych'}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{user ? 'Zalogowany' : 'Niezalogowany'}</strong>
          </div>
          <div>
            <span>ID użytkownika</span>
            <strong>{user?.uid || 'Brak'}</strong>
          </div>
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          Wyloguj
        </Button>
      </div>
    </div>
  );
}

export default ProfilePage;
