import { artMusicSellerProfileApi } from "../api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const artMusicSellerProile = createAsyncThunk(
  "artmusicsellerprofile",
  async (payload: any) => {
    try {
      const result = await artMusicSellerProfileApi(payload);
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

const ArtMusicSellerProfileSlice = createSlice({
  name: "artmusicsellerprofile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(artMusicSellerProile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(artMusicSellerProile.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(artMusicSellerProile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default ArtMusicSellerProfileSlice.reducer;
