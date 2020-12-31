import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const incrementAsync = (
  amount: number
): ThunkAction<void, RootState, unknown, PayloadAction<number>> => (
  dispatch
) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
