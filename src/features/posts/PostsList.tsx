import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import styles from './PostsList.module.scss';
import { selectPosts } from './postsSlice';
import { Post } from './Post';

export const PostsList: FunctionComponent = () => {
  const posts = useSelector(selectPosts);

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Posts</h1>
      <div className={styles.posts}>
        {posts.length > 0 ? (
          posts
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((post) => <Post key={post.id} post={post} />)
        ) : (
          <div className={styles.empty}>No posts to show</div>
        )}
      </div>
    </section>
  );
};
