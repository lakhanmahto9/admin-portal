import BASE_URL from "../../baseUrl";
import axios from "axios";


export const FetchTotalUserPlaylistCreatorCount= () => {
  return axios.get(`${BASE_URL}/admin/total-countss`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const fetchSalesCourseApi= () => {
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
        // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  };