// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  //   baseURL: "http://localhost:5000/api/", // Replace with your API base URL
  baseURL: "https://m-oodsync-real-time-mood-based-musi.vercel.app/api/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional timeout
});

// Optionally, add interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token or modify config before request is sent
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      console.warn("Unauthorized access - maybe redirect to login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
