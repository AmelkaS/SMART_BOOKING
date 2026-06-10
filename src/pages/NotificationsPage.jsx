import { useNotifications } from '../context/NotificationContext.jsx';

function NotificationsPage() {
  const { notifications, markAllNotificationsAsRead, markNotificationAsRead } =
    useNotifications();
  const hasUnreadNotifications = notifications.some((notification) => !notification.read);

  return (
    <div className="page page-notifications notifications-page">
      <section className="notifications-panel" aria-labelledby="notifications-heading">
        <h1 id="notifications-heading">Powiadomienia</h1>

        <button
          type="button"
          className="notifications-read-button"
          onClick={markAllNotificationsAsRead}
          disabled={!hasUnreadNotifications}
        >
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

              {notification.read ? (
                <span>Przeczytane</span>
              ) : (
                <button
                  type="button"
                  className="notification-read-button"
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  Odczytaj
                </button>
              )}
            </article>
          ))}

          {notifications.length === 0 && (
            <p className="notifications-empty-state">Brak powiadomień.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default NotificationsPage;
