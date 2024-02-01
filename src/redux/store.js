import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';
import firebaseSlice from './firebaseSlice'

export default configureStore({
  reducer: {
    firebase: firebaseSlice,
    searchSlice
  },
});