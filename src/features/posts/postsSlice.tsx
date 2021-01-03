import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { RootState } from '../../store';

export type PostType = {
  id: number;
  date: string;
  title: string;
  content: string;
  userId: string;
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

const initialState: PostType[] = [
  {
    id: 0,
    title: 'First Post!',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    userId: 'hash2',
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: 1,
    title: 'Second Post',
    content: 'More text',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    userId: 'hash3',
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
];

let postsIndex = initialState.length;

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<PostType>) {
        state.unshift(action.payload);
      },
      prepare({
        title,
        content,
        userId,
      }: {
        title: PostType['title'];
        content: PostType['content'];
        userId: PostType['userId'];
      }) {
        return {
          payload: {
            id: postsIndex++,
            date: new Date().toISOString(),
            title,
            content,
            userId,
            reactions: postReactions.reduce((acc, { name }) => {
              return { ...acc, [name]: 0 };
            }, {}),
          },
        };
      },
    },
    updatePost(
      state,
      action: PayloadAction<{
        id: PostType['id'];
        title: PostType['title'];
        content: PostType['content'];
      }>
    ) {
      const { id, title, content } = action.payload;
      const post = state.find((post) => post.id === id);
      if (post) {
        post.title = title;
        post.content = content;
      }
    },
    removePost(state, action: PayloadAction<{ id: PostType['id'] }>) {
      const { id } = action.payload;
      const index = state.findIndex((post) => post.id === id);
      state.splice(index, 1);
    },
    addPostReaction(
      state,
      action: PayloadAction<{
        id: PostType['id'];
        name: typeof postReactions[0]['name'];
      }>
    ) {
      const { id, name } = action.payload;
      const post = state.find((post) => post.id === id);
      if (post) {
        post.reactions[name] += 1;
      }
    },
  },
});

export const {
  addPost,
  updatePost,
  removePost,
  addPostReaction,
} = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
