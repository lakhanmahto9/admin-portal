
import { allphbuyeapi } from "@/redux/api/photography/photographyapi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AllPhBuyer = createAsyncThunk("phbuyer", async (payload:any) => {
  try {
    const result = await allphbuyeapi(payload);
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

const allPhBuyerSlice = createSlice({
  name: "phbuyer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AllPhBuyer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AllPhBuyer.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(AllPhBuyer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default allPhBuyerSlice.reducer