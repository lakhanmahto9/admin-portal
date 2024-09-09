import { disabledAdminNotificationForVideoApi } from "../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const disabledAdminNotificationForVideo = createAsyncThunk(
  "disabledadminnotificationforvideo",
  async () => {
    try {
      const response = await disabledAdminNotificationForVideoApi();
      return response.data;
    } catch (error:any) {
      toast.error(error.response.data.message)
    }
  }
);