import { createSlice } from '@reduxjs/toolkit';

export const merchantsSlice = createSlice({
  name: 'merchants',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = merchantsSlice.actions;

export default merchantsSlice.reducer;
