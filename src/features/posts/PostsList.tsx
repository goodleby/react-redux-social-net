import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PostsList.module.scss';
import {
  fetchPosts,
  selectPosts,
  selectPostsStatus,
  selectPostsError,
} from './postsSlice';
import { Post } from './Post';

export const PostsList: FunctionComponent = () => {
  const posts = useSelector(selectPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPosts());
  }, [status, dispatch]);

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Posts</h1>
      {status === 'pending' && <div className={styles.message}>loading...</div>}
      {status === 'fulfilled' && (
        <div className={styles.posts}>
          {posts.length > 0 ? (
            posts
              .slice()
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((post) => <Post key={post.id} post={post} />)
          ) : (
            <div className={styles.message}>No posts to show</div>
          )}
        </div>
      )}
      {status === 'rejected' && <div className={styles.message}>{error}</div>}
    </section>
  );
};
