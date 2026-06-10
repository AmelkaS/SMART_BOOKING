import { Navigate } from 'react-router-dom';

function ProtectedRoute({ user, children }) {
  if (user === undefined) {
    return <div className="loading-screen">Ładowanie...</div>;
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
