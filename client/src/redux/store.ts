import contactSlice from './slices/currentContact';
import userSlice from './slices/userSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    user: userSlice,
    currentContact: contactSlice,
  },
});
