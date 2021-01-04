import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './NotificationsList.module.scss';
import { readAll, selectNotifications } from './notificationsSlice';
import { Notification } from './Notification';

export const NotificationsList: FunctionComponent = () => {
  const notifications = useSelector(selectNotifications);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAll());
  });

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Notifications</h1>
      <div className={styles.notifications}>
        {notifications.length > 0 ? (
          notifications
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))
        ) : (
          <div className={styles.message}>No notifications yet</div>
        )}
      </div>
    </section>
  );
};
