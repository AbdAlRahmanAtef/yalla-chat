import { LOCAL_STORAGE_USER_KEY } from "constants/index";
import { createSlice } from "@reduxjs/toolkit";

const token =
  typeof localStorage !== "undefined" &&
  localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    ? // @ts-ignore
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY)).token
    : "";

const user =
  typeof localStorage !== "undefined" &&
  localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    ? // @ts-ignore
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY)).user
    : {};

const initialState = {
  token: token || "",
  user: user || {},
};

const saveJSON = (state: {}) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(state));
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

      saveJSON(state);
    },
    logOut: (state) => {
      state.token = "";
      state.user = {};

      saveJSON(state);
    },
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
