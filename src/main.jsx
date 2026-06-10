import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ReservationProvider } from './context/ReservationContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReservationProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </ReservationProvider>
  </React.StrictMode>
);
