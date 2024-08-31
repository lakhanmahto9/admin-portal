import { sellsapi } from "@/redux/api/photography/photographyapi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const salesPhotography = createAsyncThunk("sale", async () => {
  try {
    const result = await sellsapi();
    return result.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  status: "idle",
  error: null as string | any,
  data: null as any,
};

const salePhotographySlice = createSlice({
  name: "sale",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(salesPhotography.pending, (state) => {
        console.log("pending");
        state.status = "loading";
        state.error = null;
      })
      .addCase(salesPhotography.fulfilled, (state, action) => {
        console.log("success", action.payload);
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(salesPhotography.rejected, (state, action) => {
        console.log("failed");
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default salePhotographySlice.reducer