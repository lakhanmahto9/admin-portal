import BASE_URL from "@/baseUrl";
import axios from "axios";

export const getEcommerceTotalRevenue = () => {
  return axios.get(`${BASE_URL}/admin/get-ecommerce-total-revenue`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};
