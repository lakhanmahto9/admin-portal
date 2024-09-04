
import { notificationupadateapi } from "@/redux/api/photography/photographyapi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const upadateNotification = createAsyncThunk("notification", async () => {
  try {
    const result = await notificationupadateapi();
    return result.data;
  } catch (error) {
    console.log(error);
  }
});