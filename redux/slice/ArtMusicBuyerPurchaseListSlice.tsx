import { artMusicBuyerPurchaseListApi } from "../api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const particularArtMusicBuyerPurchaseList = createAsyncThunk(
  "artmusicbuyerpurchaselist",
  async (payload: any) => {
    try {
      const result = await artMusicBuyerPurchaseListApi(payload);
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

const particularArtMusicBuyerPurchaseListSlice = createSlice({
  name: "artmusicbuyerpurchaselist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(particularArtMusicBuyerPurchaseList.pending, (state) => {
        console.log("pending");
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        particularArtMusicBuyerPurchaseList.fulfilled,
        (state, action) => {
          console.log("success", action.payload);
          state.status = "success";
          state.data = action.payload;
        }
      )
      .addCase(
        particularArtMusicBuyerPurchaseList.rejected,
        (state, action) => {
          console.log("failed");
          state.status = "failed";
          state.error = action.payload as string;
        }
      );
  },
});
export default particularArtMusicBuyerPurchaseListSlice.reducer;
