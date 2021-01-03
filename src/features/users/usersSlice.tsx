import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type UserOpts = {
  name: string;
};

export type UserType = UserOpts & {
  id: string;
};

const initialState = [
  { id: 'hash1', name: 'Tianna Jenkins' },
  { id: 'hash2', name: 'Kevin Grant' },
  { id: 'hash3', name: 'Madison Price' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

// export const {} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
