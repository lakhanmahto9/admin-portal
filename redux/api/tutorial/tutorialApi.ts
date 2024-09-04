import BASE_URL from "../../../baseUrl";
import axios from "axios";

export const fetchAllUsersApi = () => {
  return axios.get(`${BASE_URL}/admin/get-users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const fetchAllCreatersApi = () => {
  return axios.get(`${BASE_URL}/admin/get-creators`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const fetchAllSubscribersApi = () => {
  return axios.get(`${BASE_URL}/admin/paid-users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const fetchAllPlaylistApi = () => {
  return axios.get(`${BASE_URL}/admin/get-playlists`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const fetchTopSellersOnBasisOfSalesApi = () => {
  return axios.get(
    `${BASE_URL}/admin/top-sellers-on-the-basis-of-number-of-sale-and-total-revenue`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};
