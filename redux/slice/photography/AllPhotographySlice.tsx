import { allphotographyapi } from "@/redux/api/photography/photographyapi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPerticularSellerPhotography = createAsyncThunk("photography", async (payload:any) => {
  try {
    const result = await allphotographyapi(payload);
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

const perticularPhPhotographySellerSlice = createSlice({
  name: "photography",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPerticularSellerPhotography.pending, (state) => {
        console.log("pending");
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPerticularSellerPhotography.fulfilled, (state, action) => {
        console.log("success", action.payload);
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getPerticularSellerPhotography.rejected, (state, action) => {
        console.log("failed");
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default perticularPhPhotographySellerSlice.reducer