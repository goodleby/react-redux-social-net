import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import { Header } from './Header';
import { NotFound } from './NotFound';
import { AddPostForm } from '../features/posts/AddPostForm';
import { PostsList } from '../features/posts/PostsList';
import { SinglePost } from '../features/posts/SinglePost';
import { EditPostForm } from '../features/posts/EditPostForm';
import { UsersList } from '../features/users/UsersList';
import { UserPage } from '../features/users/UserPage';
import { NotificationsList } from '../features/notifications/NotificationsList';

export const App: FunctionComponent = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <div className={styles.content}>
            <AddPostForm />
            <PostsList />
          </div>
        </Route>
        <Route exact path="/users">
          <div className={styles.content}>
            <UsersList />
          </div>
        </Route>
        <Route exact path="/notifications">
          <div className={styles.content}>
            <NotificationsList />
          </div>
        </Route>
        <Route exact path="/post/:postId">
          <div className={styles.content}>
            <SinglePost />
          </div>
        </Route>
        <Route exact path="/edit/:postId">
          <div className={styles.content}>
            <EditPostForm />
          </div>
        </Route>
        <Route exact path="/user/:userId">
          <div className={styles.content}>
            <UserPage />
          </div>
        </Route>
        <Route>
          <div className={styles.content}>
            <NotFound />
          </div>
        </Route>
      </Switch>
    </Router>
  );
};
