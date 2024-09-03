import {fetchAllArtMusicSalesHistoryApi} from "../api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllArtMusicSalesHistory = createAsyncThunk(
  "fetchallartmusicsaleshistory",
  async () => {
    try {
      const response = await fetchAllArtMusicSalesHistoryApi();
      console.log(response.data)
      return response.data;
    } catch (error:any) {
      console.log(error.response.data.message)
      // toast.error(error.response.data.message)
    }
  }
);
