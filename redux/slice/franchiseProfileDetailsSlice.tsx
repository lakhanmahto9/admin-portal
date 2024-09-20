import { franchiseProfileDetailsApi } from "../api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const franchiseProfileDetails = createAsyncThunk(
  "franchiseprofiledetails",
  async (payload: any) => {
    try {
      const result = await franchiseProfileDetailsApi(payload);
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

const franchiseProfileDetailsSlice = createSlice({
  name: "franchiseprofiledetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(franchiseProfileDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(franchiseProfileDetails.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(franchiseProfileDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default franchiseProfileDetailsSlice.reducer;
