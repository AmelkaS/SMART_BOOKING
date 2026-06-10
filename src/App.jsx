import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Hotjar from '@hotjar/browser';
import ReactGA from 'react-ga4';
import AnalyticsListener from './components/AnalyticsListener.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import EntriesPage from './pages/EntriesPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import CalendarPage from './pages/CalendarPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { useAuthState } from './firebaseAuth.js';

function App() {
  const user = useAuthState();

  useEffect(() => {
    const analyticsId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
    if (analyticsId) {
      ReactGA.initialize(analyticsId);
    }

    const hotjarSiteId = Number(import.meta.env.VITE_HOTJAR_SITE_ID);
    const hotjarVersion = Number(import.meta.env.VITE_HOTJAR_VERSION) || 6;
    if (hotjarSiteId) {
      Hotjar.init(hotjarSiteId, hotjarVersion);
    }
  }, []);

  return (
    <BrowserRouter>
      <AnalyticsListener />
      <div className="app-shell">
        <Navbar user={user} />
        <main className="page-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/entries"
              element={
                <ProtectedRoute user={user}>
                  <EntriesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute user={user}>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute user={user}>
                  <HistoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute user={user}>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute user={user}>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute user={user}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
