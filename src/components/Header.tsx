import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import {
  fetchNotifications,
  selectNotifications,
} from '../features/notifications/notificationsSlice';

export const Header: FunctionComponent = () => {
  const newNotifications = useSelector(selectNotifications).filter(
    (notification) => !notification.read
  );
  const dispatch = useDispatch();

  return (
    <nav className={styles.wrapper}>
      <section className={styles.content}>
        <Link to={'/'} className={styles.title}>
          React Redux Typescript
        </Link>
        <button
          className={styles.button}
          onClick={() => dispatch(fetchNotifications())}
        >
          Refresh
        </button>
        <div className={styles.links}>
          <Link to={'/users'} className={styles.link}>
            Users
          </Link>
          <Link to={'/notifications'} className={styles.link}>
            Notifications
            {newNotifications.length > 0 ? ` (${newNotifications.length})` : ''}
          </Link>
        </div>
      </section>
    </nav>
  );
};
