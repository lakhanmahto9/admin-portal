import BASE_URL from "../../baseUrl";
import axios from "axios";

export const FetchTotalUserPlaylistCreatorCount = () => {
  return axios.get(`${BASE_URL}/admin/total-countss`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const fetchSalesCourseApi = () => {
  // console.log(localStorage.getItem("access_token"))
  return axios.get(`${BASE_URL}/admin/total-sale-courses`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const fetchAllUserDeatilsApi = () => {
  return axios.get(`${BASE_URL}/admin/total-user-details`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const fetchTotalTodaysArtAndMusicApi = () => {
  return axios.get(`${BASE_URL}/admin/admin-fetch-total-today's-art-music`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const fetchArtMusicAndVideoRevenueApi = () => {
  return axios.get(`${BASE_URL}/admin/total-revenue-of-video-and-art-music`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const buyerblockapi = (payload: any) => {
  return axios.patch(
    `${BASE_URL}/admin/block-unblock-buyer/${payload.userId}`,
    {
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      // },
    }
  );
};

export const artMusicBuyerProfileApi = (payload: any) => {
  return axios.post(`${BASE_URL}/admin/art-music-buyer-profile`, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const artMusicBuyerVerifyApi = (payload: any) => {
  return axios.post(
    `${BASE_URL}/admin/perticular-art-music-buyer-verify`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};

export const artMusicBuyerPurchaseListApi = (payload: any) => {
  return axios.post(
    `${BASE_URL}/admin/art-music-buyer-purchase-list`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};

export const sellerBlockApi = (payload: any) => {
  return axios.patch(
    `${BASE_URL}/admin/block-unblock-seller/${payload.userId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};

export const artMusicSellerProfileApi = (payload: any) => {
  return axios.post(`${BASE_URL}/admin/art-music-seller-profile`, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const particularSellerArtMusicApi = (payload: any) => {
  return axios.post(
    `${BASE_URL}/admin/particular-seller-art-music-list`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};
