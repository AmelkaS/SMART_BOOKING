import Button from '../components/Button.jsx';
import PagePanel from '../components/PagePanel.jsx';
import { useNotifications } from '../context/NotificationContext.jsx';

function NotificationsPage() {
  const { notifications, markAllNotificationsAsRead, markNotificationAsRead } =
    useNotifications();
  const hasUnreadNotifications = notifications.some((notification) => !notification.read);

  return (
    <div className="page page-notifications notifications-page">
      <PagePanel
        className="notifications-panel"
        title="Powiadomienia"
        titleId="notifications-heading"
      >
        <Button
          type="button"
          className="notifications-read-button"
          onClick={markAllNotificationsAsRead}
          disabled={!hasUnreadNotifications}
        >
          Oznacz wszystkie powiadomienia jako przeczytane
        </Button>

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
                <Button
                  type="button"
                  className="notification-read-button"
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  Odczytaj
                </Button>
              )}
            </article>
          ))}

          {notifications.length === 0 && (
            <p className="notifications-empty-state">Brak powiadomień.</p>
          )}
        </div>
      </PagePanel>
    </div>
  );
}

export default NotificationsPage;
