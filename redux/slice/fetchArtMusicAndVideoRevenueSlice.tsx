
import {fetchArtMusicAndVideoRevenueApi} from "../api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const artMusicAndVideoRevenue = createAsyncThunk(
  "user",
  async () => {
    try {
      const response = await fetchArtMusicAndVideoRevenueApi();
      console.log(response.data);
      return response.data;
    } catch (error:any) {
      toast.error(error.response.data.message)
    }
  }
);
const initialState = {
  status: "idle",
  error: null as any,
  user: null as any,
  creator: null as any,
  sale: null as any,
  artAndMusicSales:null as any,
  playlist : null as any,
  buyer : null as any,
  seller : null as any,


};

const artMusicAndVideoRevenueSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(artMusicAndVideoRevenue.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(artMusicAndVideoRevenue.fulfilled, (state, action) => {
        console.log(action.payload)
        state.status = "succeess";
        state.creator = action.payload.totalCrator;
        state.user = action.payload.totalUser;
        state.sale = action.payload.sale;
        state.artAndMusicSales = action?.payload?.artAndMusicSales;
        state.playlist = action.payload.totalPlaylist;
        state.seller = action.payload.totalSeller;
        state.buyer = action.payload.totalBuyer
      })
      .addCase(artMusicAndVideoRevenue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default  artMusicAndVideoRevenueSlice.reducer;

