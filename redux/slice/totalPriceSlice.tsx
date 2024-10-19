import {getTotalPrice} from "../api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const TotalPrice = createAsyncThunk(
  "price",
  async () => {
    try {
      const response = await getTotalPrice();
      console.log(response.data)
      return response.data;
    } catch (error:any) {
      console.log(error.response)
    }
  }
);

const initialState = {
  status: "idle",
  error: null as any,
  price: null as any,
};

const totalRevenue = createSlice({
  name: "price",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(TotalPrice.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(TotalPrice.fulfilled, (state, action) => {
        console.log(action.payload)
        state.status = "succeess";
        state.price = action.payload;
      })
      .addCase(TotalPrice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default  totalRevenue.reducer;
