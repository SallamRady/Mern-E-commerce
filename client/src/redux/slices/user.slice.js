import { createSlice } from "@reduxjs/toolkit";
import {
  getItemFromLS,
  removeItemFromLS,
  setDataInLS,
} from "../../utils/storage/localStorage.utilities";

// * declare inital user stat
const initialState = {};

// * create user slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginMethod: (state, action) => {
      console.log("Redux Toolkit Slice loginMethod::", action);
      const tokenData = action.payload.token.split(".")[1];
      const decodedData = window.atob(tokenData);
      const dataObject = JSON.parse(decodedData);

      setDataInLS("token", action.payload.token);
      setDataInLS("firstName", dataObject.firstName);
      setDataInLS("email", dataObject.email);
      state.token = action.payload.token;
      state.firstName = dataObject.firstName;
      state.image = dataObject.image;
      state.email = dataObject.email;
    },
    logoutMethod: (state, action) => {
      removeItemFromLS("token");
      removeItemFromLS("firstName");
      removeItemFromLS("email");
      state.token = "";
      state.firstName = "";
      state.image = "";
      state.email = "";
    },
    checkAuth: (state, action) => {
      if (getItemFromLS("token") !== null) {
        state.token = getItemFromLS("token");
        state.firstName = getItemFromLS("firstName");
        state.email = getItemFromLS("email");
      }
    },
  },
});

export const { loginMethod, logoutMethod, checkAuth } = userSlice.actions;

export default userSlice.reducer;
