import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentContact: {},
  currentRoom: '',
};

export const contactSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setContact: (state, action) => {
      state.currentContact = action.payload;
    },
    setRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    logOut: (state) => {},
  },
});

export const { setContact, setRoom, logOut } = contactSlice.actions;
export default contactSlice.reducer;
