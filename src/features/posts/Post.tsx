import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './Post.module.scss';
import { PostAuthor } from './PostAuthor';
import { PostDate } from './PostDate';
import { PostType } from './postsSlice';
import { Reactions } from './Reactions';

export type PostProps = {
  post: PostType;
};

export const Post: FunctionComponent<PostProps> = ({ post }) => {
  const { id, title, content, date, user } = post;

  return (
    <article className={styles.wrapper}>
      <Link to={`/post/${id}`} className={styles.title}>
        {title}
      </Link>
      <p className={styles.content}>{content.substring(0, 100)}</p>
      <PostDate date={date} /> <PostAuthor user={user} />
      <Reactions post={post} />
    </article>
  );
};
