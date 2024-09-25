import { PartnerBlockApi } from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const PartnerBlock = createAsyncThunk(
  "PartnerBlock",
  async (payload: any) => {
    try {
      const result = await PartnerBlockApi(payload);
      return result.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
);
