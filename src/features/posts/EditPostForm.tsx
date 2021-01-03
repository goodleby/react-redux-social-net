import { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styles from './EditPostForm.module.scss';
import { NotFound } from '../../components/NotFound';
import { updatePost, selectPosts } from './postsSlice';

export type EditPostFormParams = {
  postId: string;
};

export const EditPostForm: FunctionComponent = () => {
  const { postId } = useParams<EditPostFormParams>();

  const post = useSelector(selectPosts).find(
    (post) => String(post.id) === postId
  );

  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  const dispatch = useDispatch();
  const history = useHistory();

  if (!post) return <NotFound />;

  const { id } = post;

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Edit the post</h2>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (title && content) {
            dispatch(updatePost({ id, title, content }));
            history.push(`/post/${id}`);
          }
        }}
      >
        <label className={styles.field}>
          <span>Post Title:</span>
          <input
            type="text"
            value={title}
            className={styles.input}
            onChange={(e) => setTitle(e.target.value.trim())}
          />
        </label>
        <label className={styles.field}>
          <span>Content:</span>
          <textarea
            value={content}
            className={styles.input}
            onChange={(e) => setContent(e.target.value.trim())}
          />
        </label>
        <button className={styles.button}>Save Post</button>
      </form>
    </section>
  );
};
