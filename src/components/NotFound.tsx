import { FunctionComponent } from 'react';
import styles from './NotFound.module.scss';

export const NotFound: FunctionComponent = () => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Page not found!</h2>
    </section>
  );
};
