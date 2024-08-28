import { phsellerblockapi } from "@/redux/api/photography/photographyapi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const phsellerBlockProile = createAsyncThunk("phprofile", async (payload:any) => {
  try {
    const result = await phsellerblockapi(payload);
    return result.data;
  } catch (error) {
    console.log(error);
  }
});