import {fetchAllArtMusicBuyersApi} from "../api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllArtMusicBuyers = createAsyncThunk(
  "fetchallartmusicbuyers",
  async () => {
    try {
      const response = await fetchAllArtMusicBuyersApi();
      console.log(response.data)
      return response.data;
    } catch (error:any) {
      console.log(error.response.data.message)
      // toast.error(error.response.data.message)
    }
  }
);
