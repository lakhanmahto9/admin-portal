import {fetchSalesCourseApi} from "../api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSalesCourse = createAsyncThunk(
  "fetchsalescourse",
  async (payload:any) => {
    try {
      const response = await fetchSalesCourseApi();
      console.log(response)
      return response.data;
    } catch (error:any) {
      console.log(error.response.data.message)
      // toast.error(error.response.data.message)
    }
  }
);

const initialState = {
  status: "idle",
  error: null as any,
  sale: null as any,
};

const salesCourseSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSalesCourse.fulfilled, (state, action) => {
        console.log(action.payload)
        state.status = "succeess";
        state.sale = action.payload?.data?.totalsales;
      })
      .addCase(fetchSalesCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default  salesCourseSlice.reducer;
