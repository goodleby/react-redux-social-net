import { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import styles from './AddPostForm.module.scss';
import { sendPost } from './postsSlice';
import { selectUsers } from '../users/usersSlice';
import { RootDispatch } from '../../store';

export const AddPostForm: FunctionComponent = () => {
  const users = useSelector(selectUsers);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = useState('');
  const [sendStatus, setSendStatus] = useState<'idle' | 'pending'>('idle');

  if (users.length > 0 && user === '') setUser(users[0].id);

  const dispatch = useDispatch<RootDispatch>();

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Add a new post</h2>
      <form
        className={styles.form}
        onSubmit={async (e) => {
          e.preventDefault();
          if (title && content && user && sendStatus === 'idle') {
            try {
              setSendStatus('pending');
              const action = await dispatch(sendPost({ title, content, user }));
              unwrapResult(action);
              setTitle('');
              setContent('');
            } catch (error) {
              console.log('Failed to save the post', error);
            } finally {
              setSendStatus('idle');
            }
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
            onChange={(e) => setUser(e.target.value)}
            value={user}
          >
            {users.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <button
          className={styles.button}
          disabled={!(title && content && user && sendStatus === 'idle')}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};
