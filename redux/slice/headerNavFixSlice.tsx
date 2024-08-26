import { createSlice } from "@reduxjs/toolkit";
interface sideNave {
  fix: boolean;
}
const initialState: sideNave = {
  fix: false,
};

const navfixSlice = createSlice({
  name: "fix",
  initialState,
  reducers: {
    setFix(state,actions) {
      state.fix = !actions.payload
    },
    
  },
});

export const { setFix } = navfixSlice.actions;
export default navfixSlice.reducer;
