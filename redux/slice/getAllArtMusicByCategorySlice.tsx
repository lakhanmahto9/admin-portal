import {getAllArtMusicByCategoryApi} from "../api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllArtMusicByCategory = createAsyncThunk(
  "getAllArtMusicByCategoryApi",
  async () => {
    try {
      const response = await getAllArtMusicByCategoryApi();
      console.log(response.data)
      return response.data;
    } catch (error:any) {
      console.log(error.response.data.message)
      // toast.error(error.response.data.message)
    }
  }
);
