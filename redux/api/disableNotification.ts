import axios from "axios";
import BASE_URL from "../../baseUrl";

export const disabledNotificationApi = () => {
  return axios.get(`${BASE_URL}/creator/dissabled-notification`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};