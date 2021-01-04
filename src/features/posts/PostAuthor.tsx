import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import styles from './PostAuthor.module.scss';
import { selectUsers } from '../users/usersSlice';
import { PostType } from './postsSlice';

export type PostAuthorProps = {
  user: PostType['user'];
};

export const PostAuthor: FunctionComponent<PostAuthorProps> = ({ user }) => {
  const author = useSelector(selectUsers).find((item) => item.id === user);

  return (
    <div className={styles.wrapper}>
      by {author ? author.name : 'Unknown author'}
    </div>
  );
};
