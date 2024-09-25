import { partnersProfileDetailsApi } from "../api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const partnersProfileDetails = createAsyncThunk(
  "partnersProfileDetails",
  async (payload: any) => {
    try {
      const result = await partnersProfileDetailsApi(payload);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  status: "idle",
  error: null as string | any,
  data: null as any,
};

const partnersProfileDetailsSlice = createSlice({
  name: "partnersProfileDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(partnersProfileDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(partnersProfileDetails.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(partnersProfileDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default partnersProfileDetailsSlice.reducer;
