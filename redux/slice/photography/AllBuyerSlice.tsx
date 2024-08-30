import { allbuyerapi } from "@/redux/api/photography/photographyapi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AllBuyer = createAsyncThunk("buyer", async () => {
  try {
    const result = await allbuyerapi();
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

const allBuyerSlice = createSlice({
  name: "buyer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AllBuyer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AllBuyer.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(AllBuyer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default allBuyerSlice.reducer