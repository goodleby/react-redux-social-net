import { FunctionComponent } from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';
import styles from './PostDate.module.scss';
import { PostType } from './postsSlice';

export type PostDateProps = {
  date: PostType['date'];
};

export const PostDate: FunctionComponent<PostDateProps> = ({ date }) => {
  const timeAgo = formatDistanceToNow(parseISO(date));

  return <div className={styles.wrapper}>{timeAgo} ago</div>;
};
