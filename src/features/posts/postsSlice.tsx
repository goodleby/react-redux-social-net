import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { client } from '../../api/client';

export type PostType = {
  id: number;
  date: string;
  title: string;
  content: string;
  user: string;
  reactions: {
    [key: string]: number;
  };
};

export const postReactions = [
  { name: 'thumbsUp', emoji: '👍' },
  { name: 'hooray', emoji: '🎉' },
  { name: 'heart', emoji: '❤️' },
  { name: 'rocket', emoji: '🚀' },
  { name: 'eyes', emoji: '👀' },
];

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectPostsStatus = (state: RootState) => state.posts.status;

export const selectPostsError = (state: RootState) => state.posts.error;

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response: { posts: PostType[] } = await client.get('/fakeApi/posts');
  return response.posts;
});

export const sendPost = createAsyncThunk(
  'posts/sendPost',
  async (post: {
    title: PostType['title'];
    content: PostType['content'];
    user: PostType['user'];
  }) => {
    const response: { post: PostType } = await client.post('/fakeApi/posts', {
      post,
    });
    return response.post;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [] as PostType[],
    status: 'idle' as 'idle' | 'pending' | 'fulfilled' | 'rejected',
    error: null as string | null,
  },
  reducers: {
    // addPost: {
    //   reducer(state, action: PayloadAction<PostType>) {
    //     state.posts.push(action.payload);
    //   },
    //   prepare({
    //     title,
    //     content,
    //     user,
    //   }: {
    //     title: PostType['title'];
    //     content: PostType['content'];
    //     user: PostType['user'];
    //   }) {
    //     return {
    //       payload: {
    //         id: (postsIndex += 1),
    //         date: new Date().toISOString(),
    //         title,
    //         content,
    //         user,
    //         reactions: postReactions.reduce((acc, { name }) => {
    //           return { ...acc, [name]: 0 };
    //         }, {}),
    //       },
    //     };
    //   },
    // },
    updatePost(
      state,
      action: PayloadAction<{
        id: PostType['id'];
        title: PostType['title'];
        content: PostType['content'];
      }>
    ) {
      const { id, title, content } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      if (post) {
        post.title = title;
        post.content = content;
      }
    },
    removePost(state, action: PayloadAction<{ id: PostType['id'] }>) {
      const { id } = action.payload;
      const index = state.posts.findIndex((post) => post.id === id);
      state.posts.splice(index, 1);
    },
    addPostReaction(
      state,
      action: PayloadAction<{
        id: PostType['id'];
        name: typeof postReactions[0]['name'];
      }>
    ) {
      const { id, name } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      if (post) {
        post.reactions[name] += 1;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<PostType[]>) => {
        state.status = 'fulfilled';
        state.posts = state.posts.concat(action.payload);
      }
    );
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message || null;
    });
    builder.addCase(
      sendPost.fulfilled,
      (state, action: PayloadAction<PostType>) => {
        state.posts.push(action.payload);
      }
    );
  },
});

export const { updatePost, removePost, addPostReaction } = postsSlice.actions;

export default postsSlice.reducer;
