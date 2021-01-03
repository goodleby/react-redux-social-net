import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import styles from './SinglePost.module.scss';
import { selectPosts, removePost } from './postsSlice';
import { NotFound } from '../../components/NotFound';
import { PostAuthor } from './PostAuthor';
import { PostDate } from './PostDate';
import { Reactions } from './Reactions';

export type SinglePostParams = {
  postId: string;
};

export const SinglePost: FunctionComponent = () => {
  const { postId } = useParams<SinglePostParams>();

  const post = useSelector(selectPosts).find(
    (post) => String(post.id) === postId
  );

  const dispatch = useDispatch();
  const history = useHistory();

  if (!post) return <NotFound />;

  const { id, title, content, date, userId } = post;

  return (
    <section className={styles.wrapper}>
      <article className={styles.article}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.content}>{content}</p>
        <PostDate date={date} /> <PostAuthor userId={userId} />
        <Reactions post={post} />
        <button
          className={styles.button}
          onClick={() => {
            dispatch(removePost({ id }));
            history.push('/');
          }}
        >
          Remove the post
        </button>
        <Link to={`/edit/${id}`} className={styles.link}>
          Edit the post
        </Link>
      </article>
    </section>
  );
};
