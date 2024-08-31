import { particularSellerArtMusicApi } from "../api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const particularSellerArtMusicList = createAsyncThunk(
  "particularsellerartmusic",
  async (payload: any) => {
    try {
      const result = await particularSellerArtMusicApi(payload);
      console.log(result)
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  status: "idle",
  error: null as string | any,
  data: null as any,
};

const particularSellerArtMusicListSlice = createSlice({
  name: "particularsellerartmusic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(particularSellerArtMusicList.pending, (state) => {
        console.log("pending");
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        particularSellerArtMusicList.fulfilled,
        (state, action) => {
          console.log("success", action.payload);
          state.status = "success";
          state.data = action.payload;
        }
      )
      .addCase(
        particularSellerArtMusicList.rejected,
        (state, action) => {
          console.log("failed");
          state.status = "failed";
          state.error = action.payload as string;
        }
      );
  },
});
export default particularSellerArtMusicListSlice.reducer;
