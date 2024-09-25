import { fetchParticularQPartnerApi } from "../api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchParticularQPartner = createAsyncThunk(
  "fetchparticularqpartner",
  async (payload: any) => {
    try {
      const result = await fetchParticularQPartnerApi(payload);
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

const fetchParticularQPartnerSlice = createSlice({
  name: "fetchparticularqpartner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticularQPartner.pending, (state) => {
        console.log("pending");
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchParticularQPartner.fulfilled,
        (state, action) => {
          console.log("success", action.payload);
          state.status = "success";
          state.data = action.payload;
        }
      )
      .addCase(
        fetchParticularQPartner.rejected,
        (state, action) => {
          console.log("failed");
          state.status = "failed";
          state.error = action.payload as string;
        }
      );
  },
});
export default fetchParticularQPartnerSlice.reducer;
