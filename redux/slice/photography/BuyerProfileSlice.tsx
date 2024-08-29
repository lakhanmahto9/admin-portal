import { buyerprofileapi } from "@/redux/api/photography/photographyapi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const buyerProile = createAsyncThunk("buyerprofile", async (payload:any) => {
  try {
    const result = await buyerprofileapi(payload);
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

const BuyerProfileSlice = createSlice({
  name: "buyerprofile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(buyerProile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(buyerProile.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(buyerProile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default BuyerProfileSlice.reducer