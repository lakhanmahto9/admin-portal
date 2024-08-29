import {fetchTotalTodaysArtAndMusicApi} from "../api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCountTotalTodaysArtAndMusic = createAsyncThunk(
  "fetchcounttotaltodaysartmusic",
  async (payload:any) => {
    try {
      const response = await fetchTotalTodaysArtAndMusicApi();
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

const countTotalTodaysArtMusic = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountTotalTodaysArtAndMusic.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCountTotalTodaysArtAndMusic.fulfilled, (state, action) => {
        console.log(action.payload)
        state.status = "succeess";
        state.sale = action.payload?.data?.totalsales;
      })
      .addCase(fetchCountTotalTodaysArtAndMusic.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default  countTotalTodaysArtMusic.reducer;
