import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="page page-not-found">
      <div className="not-found-card">
        <span className="eyebrow">404</span>
        <h1>Strona nie istnieje</h1>
        <p>Wygląda na to, że ta ścieżka nie jest dostępna. Wróć do panelu głównego, aby kontynuować.</p>
        <Link to="/" className="button button-primary">
          Powrót do dashboardu
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
