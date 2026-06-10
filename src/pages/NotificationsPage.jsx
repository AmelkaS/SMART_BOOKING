import { useState } from 'react';

const initialNotifications = [
  {
    id: 1,
    title: 'Złożono rezerwację',
    message: 'Twoja rezerwacja sali Sala 1 została złożona i oczekuje na zatwierdzenie.',
    read: true,
  },
  {
    id: 2,
    title: 'Rezerwacja zatwierdzona',
    message: 'Twoja rezerwacja sali Sala 2 została zatwierdzona.',
    read: true,
  },
  {
    id: 3,
    title: 'Złożono rezerwację',
    message: 'Twoja rezerwacja sali Sala 1 została złożona i oczekuje na zatwierdzenie.',
    read: false,
  },
];

function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  return (
    <div className="page page-notifications notifications-page">
      <section className="notifications-panel" aria-labelledby="notifications-heading">
        <h1 id="notifications-heading">Powiadomienia</h1>

        <button type="button" className="notifications-read-button" onClick={markAllAsRead}>
          Oznacz wszystkie powiadomienia jako przeczytane
        </button>

        <div className="notifications-list">
          {notifications.map((notification) => (
            <article
              className={
                notification.read
                  ? 'notification-list-item is-read'
                  : 'notification-list-item'
              }
              key={notification.id}
            >
              <div>
                <h2>{notification.title}</h2>
                <p>{notification.message}</p>
              </div>
              {notification.read && <span>Przeczytane</span>}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default NotificationsPage;
