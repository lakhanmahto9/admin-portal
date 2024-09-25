import { partnerProfileVerifyApi } from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const partnerProfileVerify = createAsyncThunk(
  "partnerProfileVerifyApi",
  async (payload: any) => {
    try {
      const result = await partnerProfileVerifyApi(payload);
      return result.data;
    } catch (error: any) {
      toast.warn(error.response.data.message);
      console.log(error);
    }
  }
);
