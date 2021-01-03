import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './features/posts/postsSlice';
import usersSlice from './features/users/usersSlice';

const store = configureStore({
  reducer: {
    posts: postsSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
