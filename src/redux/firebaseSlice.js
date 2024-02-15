import { createSlice } from '@reduxjs/toolkit';

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState: {
    token: null,
  },
  reducers: {
    handletoken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { handletoken } = firebaseSlice.actions;
export default firebaseSlice.reducer;
