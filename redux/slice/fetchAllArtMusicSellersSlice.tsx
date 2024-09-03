import {fetchAllArtMusicSellersApi} from "../api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllArtMusicSellers = createAsyncThunk(
  "fetchallartmusicsellers",
  async () => {
    try {
      const response = await fetchAllArtMusicSellersApi();
      console.log(response.data)
      return response.data;
    } catch (error:any) {
      console.log(error.response.data.message)
      // toast.error(error.response.data.message)
    }
  }
);
