import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import styles from './PostAuthor.module.scss';
import { selectUsers } from '../users/usersSlice';

export type PostAuthorProps = {
  userId?: string;
};

export const PostAuthor: FunctionComponent<PostAuthorProps> = ({ userId }) => {
  const user = useSelector(selectUsers).find((user) => user.id === userId);

  return (
    <div className={styles.wrapper}>
      by {user ? user.name : 'Unknown author'}
    </div>
  );
};
