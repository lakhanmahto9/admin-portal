import { artMusicBuyerProfileApi } from "../api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const artMusicBuyerProile = createAsyncThunk(
  "artmusicbuyerprofile",
  async (payload: any) => {
    try {
      const result = await artMusicBuyerProfileApi(payload);
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

const ArtMusicBuyerProfileSlice = createSlice({
  name: "artmusicbuyerprofile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(artMusicBuyerProile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(artMusicBuyerProile.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(artMusicBuyerProile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default ArtMusicBuyerProfileSlice.reducer;
