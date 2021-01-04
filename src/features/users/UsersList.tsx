import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './UsersList.module.scss';
import { selectUsers } from './usersSlice';

export const UsersList: FunctionComponent = () => {
  const users = useSelector(selectUsers);

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Users</h1>
      <div className={styles.users}>
        {users.length > 0 ? (
          users.map(({ id, name }) => (
            <Link key={id} to={`/user/${id}`} className={styles.link}>
              {name}
            </Link>
          ))
        ) : (
          <div className={styles.message}>No users to show</div>
        )}
      </div>
    </section>
  );
};
