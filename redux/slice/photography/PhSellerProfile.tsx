import { phsellerprofileapi } from "@/redux/api/photography/photographyapi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const phsellerProile = createAsyncThunk("phprofile", async (payload:any) => {
  try {
    const result = await phsellerprofileapi(payload);
    return result.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  status: "idle",
  error: null as string | any,
  data: null as any,
};

const PhSellerProfileSlice = createSlice({
  name: "phprofile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(phsellerProile.pending, (state) => {
        console.log("pending");
        state.status = "loading";
        state.error = null;
      })
      .addCase(phsellerProile.fulfilled, (state, action) => {
        console.log("success", action.payload);
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(phsellerProile.rejected, (state, action) => {
        console.log("failed");
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default PhSellerProfileSlice.reducer