import axios, { AxiosInstance, AxiosResponse } from "axios";

/**
 * Lấy base URL từ biến môi trường .env.local
 * Ví dụ đặt trong .env.local:
 * NEXT_PUBLIC_BASE_URL=http://localhost:8080/HiVision
 */
const API_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8081/HiVision";

// Khởi tạo 1 Axios instance duy nhất cho toàn app
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: tự động gắn token (nếu có)
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: xử lý lỗi chung (ví dụ logout khi 401)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // TODO: kiểm tra error.response.status === 401 để redirect login
    return Promise.reject(error);
  }
);

export default axiosInstance;
