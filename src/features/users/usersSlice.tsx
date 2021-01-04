import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { client } from '../../api/client';

export type UserType = {
  id: string;
  name: string;
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users');
  return response.users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as UserType[],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<UserType[]>) => {
        state.users = action.payload;
      }
    );
  },
});

// export const {} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
