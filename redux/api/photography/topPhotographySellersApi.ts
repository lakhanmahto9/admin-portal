import BASE_URL from "@/baseUrl";
import axios from "axios";

export const getTopSellers = (type: 'revenue' | 'sales') => {
  return axios.get(`${BASE_URL}/admin/top-photography-sellers?type=${type}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};
