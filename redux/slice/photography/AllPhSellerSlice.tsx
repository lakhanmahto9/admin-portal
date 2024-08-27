import { allphsellerapi } from "@/redux/api/photography/photographyapi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllSeller = createAsyncThunk("phseller", async () => {
  try {
    const result = await allphsellerapi();
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

const allPhSellerSlice = createSlice({
  name: "phseller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSeller.pending, (state) => {
        console.log("pending");
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllSeller.fulfilled, (state, action) => {
        console.log("success", action.payload);
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getAllSeller.rejected, (state, action) => {
        console.log("failed");
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default allPhSellerSlice.reducer