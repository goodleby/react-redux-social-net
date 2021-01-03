import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header: FunctionComponent = () => {
  return (
    <nav className={styles.wrapper}>
      <section className={styles.content}>
        <Link to={'/'} className={styles.title}>
          React Redux Typescript
        </Link>
        <div className={styles.links}></div>
      </section>
    </nav>
  );
};
