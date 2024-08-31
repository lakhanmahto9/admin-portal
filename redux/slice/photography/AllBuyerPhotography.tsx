import { buyerphotographyapi } from "@/redux/api/photography/photographyapi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const buyerPhotography = createAsyncThunk("buyerphotography", async (payload:any) => {
  try {
    const result = await buyerphotographyapi(payload);
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

const BuyerPhotograhySlice = createSlice({
  name: "buyerphotography",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(buyerPhotography.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(buyerPhotography.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(buyerPhotography.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default BuyerPhotograhySlice.reducer