import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './features/posts/postsSlice';
import usersSlice from './features/users/usersSlice';
import notificationsSlice from './features/notifications/notificationsSlice';

const store = configureStore({
  reducer: {
    posts: postsSlice,
    users: usersSlice,
    notifications: notificationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type RootDispatch = typeof store.dispatch;

export default store;
