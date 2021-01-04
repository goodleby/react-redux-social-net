import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './UserPage.module.scss';
import { NotFound } from '../../components/NotFound';
import { selectPosts } from '../posts/postsSlice';
import { selectUsers } from './usersSlice';
import { Post } from '../posts/Post';

export type UserPageParams = {
  userId: string;
};

export const UserPage: FunctionComponent = () => {
  const { userId } = useParams<UserPageParams>();

  const user = useSelector(selectUsers).find((user) => user.id === userId);
  const posts = useSelector(selectPosts).filter((post) => post.user === userId);

  if (!user) return <NotFound />;

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>{user.name}</h1>
      <div className={styles.posts}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};
