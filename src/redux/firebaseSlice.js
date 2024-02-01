import { createSlice } from '@reduxjs/toolkit';

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState: {
    token: null,
  },
  reducers: {
    setFirebaseToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setFirebaseToken } = firebaseSlice.actions;
export default firebaseSlice.reducer;
