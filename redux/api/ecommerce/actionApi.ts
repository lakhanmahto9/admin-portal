import BASE_URL from "@/baseUrl";
import axios from "axios";

// API for blocking or unblocking an eCommerce buyer
export const blockOrUnblockEcommerceBuyerApi = (buyerId: string) => {
  return axios.patch(
    `${BASE_URL}/admin/block-or-unblock-ecommerce-buyer/${buyerId}`,
    {}, // If you have a body, pass it here; otherwise leave it empty
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};

// API for editing a user
export const editUserApi = (userId: string, updates: any) => {
  return axios.put(
    `${BASE_URL}/admin/edit-user/${userId}`,
    updates, // Pass the updates object which contains the data to be modified
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};

// API for viewing user details
export const viewUserApi = (userId: string) => {
  return axios.get(
    `${BASE_URL}/admin/view-ecommerce-buyer/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};

// API for verifying user 
export const verifyEUserApi = (userId: string) => {
  return axios.patch(
    `${BASE_URL}/admin/verify-ebuyer/${userId}`,
    {}, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};
