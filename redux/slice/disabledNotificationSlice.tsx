import {disabledNotificationApi} from "../api/disableNotification"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const DisabledNotification = createAsyncThunk(
  "disablednotification",
  async () => {
    try {
      const response = await disabledNotificationApi();
      return response.data;
    } catch (error:any) {
      toast.error(error.response.data.message)
    }
  }
);