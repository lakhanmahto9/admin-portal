import { apiSlice } from "./apiSlice";
import { ADMIN_URL } from "../constant";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/get-users`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
    getCreators: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/get-creators`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
    getPlaylists: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/get-playlists`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
    userBlockUnblock: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/block-unblock-user/${userId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
    editUser: builder.mutation({
      query: (updatedUser) => ({
        url: `${ADMIN_URL}/edit-user/${updatedUser._id}`,
        method: "PUT",
        body: updatedUser,
      }),
    }),

    creatorBlockUnblock: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/block-unblock-creator/${userId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    editCreator: builder.mutation({
      query: (updatedCreator) => ({
        url: `${ADMIN_URL}/edit-creator/${updatedCreator._id}`,
        method: "PUT",
        body: updatedCreator,
      }),
    }),

    deletePlaylist: builder.mutation({
      query: (playlistId) => ({
        url: `${ADMIN_URL}/delete-playlist/${playlistId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    paidUsers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/paid-users`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    fetchCreatorAddress: builder.query({
      query: (userId) => ({
        url: `${ADMIN_URL}/fetch-creator-address/${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),


    getBuyers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/get-buyers`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
    buyerBlockUnblock: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/block-unblock-buyer/${userId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),


    
    getSellers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/get-sellers`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
    sellerBlockUnblock: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/block-unblock-seller/${userId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),


    getAllArtsAndMusics: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/get-all-arts-and-musics`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    deleteArtOrMusic: builder.mutation({
      query: ({ id, type }) => ({
        url: `${ADMIN_URL}/delete-art-or-music/${id}/${type}`, 
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),


    purchaseHistoryOfArtAndMusic: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/purchase-history-of-art-and-music`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getAllPhotograph: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/get-all-photographs`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getPhotographySellers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/photography-get-sellers`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
    photographySellerBlockUnblock: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/photography-block-unblock-seller/${userId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getPhotographyBuyers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/photography-get-buyers`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
    photographyBuyersBlockUnblock: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/photography-block-unblock-buyer/${userId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    purchaseHistoryOfPhotography: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/purchase-history-of-photography`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
    
  }),
});

export const {
  useLoginMutation,
  useGetUsersQuery,
  useGetCreatorsQuery,
  useGetBuyersQuery,
  useGetSellersQuery,
  useGetAllArtsAndMusicsQuery,
  useDeleteArtOrMusicMutation,
  useSellerBlockUnblockMutation,
  useGetPlaylistsQuery,
  useUserBlockUnblockMutation,
  useBuyerBlockUnblockMutation,
  useEditUserMutation,
  useCreatorBlockUnblockMutation,
  useEditCreatorMutation,
  useDeletePlaylistMutation,
  usePaidUsersQuery,
  usePurchaseHistoryOfArtAndMusicQuery,
  useFetchCreatorAddressQuery,
  useGetAllPhotographQuery,
  useGetPhotographySellersQuery,
  usePhotographySellerBlockUnblockMutation,
  useGetPhotographyBuyersQuery,
  usePhotographyBuyersBlockUnblockMutation,
  usePurchaseHistoryOfPhotographyQuery,
} = userApiSlice;
