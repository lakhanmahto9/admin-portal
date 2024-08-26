import { createSlice } from "@reduxjs/toolkit";
interface navFixColor {
  color: string;
}
const initialState: navFixColor = {
    color: "#eaedfc",
};

const navfixColorSlice = createSlice({
  name: "sidebarbg",
  initialState,
  reducers: {
    setNavColor(state, actions) {
      state.color = actions.payload;
    },
  },
});

export const { setNavColor  } = navfixColorSlice.actions;
export default navfixColorSlice.reducer;
