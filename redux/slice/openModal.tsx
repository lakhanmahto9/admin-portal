import { createSlice } from "@reduxjs/toolkit";
//prashant video header
const initialState = {
  open: false,
  type: "",
  data: {},
};

const OpenModal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal(state, actions) {
      state.data = actions.payload.data;
      state.open = actions.payload.open;
      state.type = actions.payload.type;
    },
    removeModal(state, actions) {
      state.data = {};
      state.open = actions.payload.open;
      state.type = actions.payload.type;
    },
  },
});
export const { setModal, removeModal } = OpenModal.actions;
export default OpenModal.reducer;
