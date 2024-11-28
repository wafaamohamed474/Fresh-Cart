import { configureStore } from "@reduxjs/toolkit";
import AlertMsgReducer from "./slices/alertSlice";
import userDataReducer from "./slices/userDataSlice";

const store = configureStore({
  reducer: {
    alertMsg: AlertMsgReducer,
    userData: userDataReducer,
  },
});

export default store;
