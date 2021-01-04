import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Reactions.module.scss';
import { PostType, postReactions, addPostReaction } from './postsSlice';

export type ReactionsProps = {
  post: PostType;
};

export const Reactions: FunctionComponent<ReactionsProps> = ({ post }) => {
  const { id, reactions } = post;
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      {postReactions.map(({ name, emoji }) => (
        <button
          key={name}
          type="button"
          className={styles.button}
          onClick={() => dispatch(addPostReaction({ id, name }))}
        >
          {emoji} {reactions[name]}
        </button>
      ))}
    </div>
  );
};
