import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { formatDistanceToNow, parseISO } from 'date-fns';
import styles from './Notification.module.scss';
import { NotificationType } from './notificationsSlice';
import { selectUsers } from '../users/usersSlice';

export type NotificationProps = {
  notification: NotificationType;
};

export const Notification: FunctionComponent<NotificationProps> = ({
  notification,
}) => {
  const { date, message, isNew, user: userId } = notification;

  const user = useSelector(selectUsers).find((user) => user.id === userId);
  const timeAgo = formatDistanceToNow(parseISO(date));

  return (
    <div className={`${styles.wrapper} ${isNew ? styles.wrapper_new : ''}`}>
      <div className={styles.content}>
        <strong>{user ? user.name : 'Unknown user'}</strong> {message}
      </div>
      <div className={styles.date}>{timeAgo} ago</div>
    </div>
  );
};
