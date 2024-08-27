import BASE_URL from "@/baseUrl";
import axios from "axios";

export const allphsellerapi = () => {
    return axios.get(`${BASE_URL}/admin/total-ph-seller`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
};

export const allphotographyapi = (payload:any) => {
  return axios.post(`${BASE_URL}/admin/total-photography`,payload,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};