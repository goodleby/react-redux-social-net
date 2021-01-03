import { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AddPostForm.module.scss';
import { selectUsers } from '../users/usersSlice';
import { addPost } from './postsSlice';

export const AddPostForm: FunctionComponent = () => {
  const users = useSelector(selectUsers);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(users[0].id);

  const dispatch = useDispatch();

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Add a new post</h2>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (title && content) {
            dispatch(addPost({ title, content, userId }));
            setTitle('');
            setContent('');
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
        <label className={styles.field}>
          <span>User:</span>
          <select
            className={styles.input}
            onChange={(e) => setUserId(e.target.value)}
            value={userId}
          >
            {users.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <button className={styles.button}>Save Post</button>
      </form>
    </section>
  );
};
