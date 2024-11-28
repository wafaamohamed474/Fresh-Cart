import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  name: "",
  email: "",
  phone: "",
  id: null,
  password: "",
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.id = action.payload.id;
      state.password = action.payload.password;
      state.token = action.payload.token;
    },
    clearUserData: (state) => {
      state.token = null;
      state.name = "";
      state.email = "";
      state.password = "";
      state.phone = "";
      state.id = null;
    },
  },
});

export const { setToken, setUserData, clearUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
