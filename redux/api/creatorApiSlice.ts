import { apiSlice } from "./apiSlice";
import { CREATOR_URL } from "../constant";


export const creatorApiSlice = apiSlice.injectEndpoints({

  endpoints: (builder) => ({

    getPlaylistVideos: builder.query({
      query: (courseId) => ({
        url: `${CREATOR_URL}/fetch-videos-by-courseId/${courseId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {  useGetPlaylistVideosQuery } = creatorApiSlice;
