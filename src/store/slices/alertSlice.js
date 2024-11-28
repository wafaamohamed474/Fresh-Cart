import { createSlice } from "@reduxjs/toolkit";

const AlertMsg = createSlice({
  name: "alertMsg",
  initialState: {
    MsgAdd: "",
    MsgWish: "",
    MsgModifiy:'',
    isAddOpen: false,
    isWishOpen: false,
    isWishRemove : false,
    isModified : false,
  },
  reducers: {
    displayAddMsg: (state, action) => {
      state.MsgAdd = action.payload;
    },
    displayWishMsg: (state, action) => {
      state.MsgWish = action.payload;
    },
    displayModifiyMsg: (state, action) => {
      state.MsgModifiy = action.payload;
    },
    openAddAlert: (state, action) => {
      state.isAddOpen = action.payload;
    },
    openWishAlert: (state, action) => {
      state.isWishOpen = action.payload;
    },
    openRemoveWishAlert: (state, action) => {
        state.isWishRemove = action.payload;
    },
    openModifiyAlert: (state, action) => {
      state.isModified = action.payload;
  },
  },
});

export const { displayAddMsg, displayWishMsg, openAddAlert, openWishAlert ,openRemoveWishAlert , openModifiyAlert , displayModifiyMsg} =
  AlertMsg.actions;
export default AlertMsg.reducer;
