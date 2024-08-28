import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  type: "",
  id:"",
  block:false
};

const OpenModalSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setDialog(state, actions) {
      state.open = actions.payload.open;
      state.type = actions.payload.type;
      state.id = actions.payload.id;
      state.block = actions.payload.block;
    },
    removeDialog(state, actions) {
        console.log(actions.payload)
      state.open = actions.payload.open;
      state.type = actions.payload.type;
      state.id = "";
    },
  },
});
export const { setDialog, removeDialog } = OpenModalSlice.actions;
export default OpenModalSlice.reducer;