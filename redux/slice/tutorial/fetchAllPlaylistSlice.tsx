import { fetchAllPlaylistApi } from "@/redux/api/tutorial/tutorialApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllPlaylist = createAsyncThunk(
  "fetchallplaylist",
  async () => {
    try {
      const response = await fetchAllPlaylistApi();
      // console.log(response.data)
      return response.data;
    } catch (error:any) {
      console.log(error.response.data.message)
      // toast.error(error.response.data.message)
    }
  }
);
