import axios from "axios";
import { toast } from "react-toastify";

export const Axios = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 150000000,
  headers: {
    "Content-type": "application/json",
  },
});

export const AxiosAuth = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 150000000,
  headers: {
    "Content-type": "application/json",
  },
});

export const get = async (url, params) => {
  return await Axios.get(url, { params });
};

export const post = async (url, params, config) => {
  try {
    return await Axios.post(url, params, config);
  } catch {
    toast.error("Failed to create user");
  }
};

export const put = async (url, params) => {
  try {
    return await Axios.put(url, params);
  } catch {
    toast.error("Failed to update user");
  }
};

// couldn't use "delete" since it's a keyword
export const del = async (url) => {
  try {
    return await Axios.delete(url);
  } catch {
    toast.error("Failed to delete user");
  }
};
