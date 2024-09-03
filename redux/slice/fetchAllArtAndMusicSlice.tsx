import {fetchAllArtAndMusicApi} from "../api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllArtAndMusic = createAsyncThunk(
  "fetchallartandmusic",
  async () => {
    try {
      const response = await fetchAllArtAndMusicApi();
      console.log(response.data)
      return response.data;
    } catch (error:any) {
      console.log(error.response.data.message)
      // toast.error(error.response.data.message)
    }
  }
);
