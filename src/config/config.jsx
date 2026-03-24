import axios from "axios";

export const backendConfig = {
base: "https://e-commerce-site-backend-1-258j.onrender.com/api",
};

export const Axios = axios.create({
  baseURL: backendConfig.base,
  withCredentials: true,
});


Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);