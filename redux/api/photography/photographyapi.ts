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

export const phsellerprofileapi = (payload:any) => {
  return axios.post(`${BASE_URL}/admin/perticular-phseller-profile`,payload,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const phsellerverifyapi = (payload:any) => {
  return axios.post(`${BASE_URL}/admin/perticular-phseller-verify`,payload,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const phsellerblockapi = (payload:any) => {
  return axios.post(`${BASE_URL}/admin/perticular-phseller-block`, payload,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};
export const allphbuyeapi = (payload:any) => {
  return axios.post(`${BASE_URL}/admin/all-ph-buyer`, payload,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const buyerprofileapi = (payload:any) => {
  return axios.post(`${BASE_URL}/admin/buyer-profile`, payload,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const allbuyerapi = () => {
  return axios.get(`${BASE_URL}/admin/all-buyer`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const phbuyerblockapi = (payload:any) => {
  return axios.post(`${BASE_URL}/admin/perticular-phbuyer-block`, payload,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const phbuyerverifyapi = (payload:any) => {
  return axios.post(`${BASE_URL}/admin/perticular-phbuyer-verify`,payload,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};


export const sellsapi = () => {
  return axios.get(`${BASE_URL}/admin/totalsales-digitalphotography`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const buyerphotographyapi = (payload:any) => {
  return axios.post(`${BASE_URL}/admin/buyer-photography`,payload,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const notificationupadateapi = () => {
  return axios.get(`${BASE_URL}/admin/update-admin-notification`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const getPhotographyCardDataApi = () => {
  return axios.get(`${BASE_URL}/admin/get-photography-card-data`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

