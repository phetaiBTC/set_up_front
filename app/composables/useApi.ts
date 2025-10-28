import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = "http://localhost:4000";

  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor (เพิ่ม token ถ้ามี)
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = useCookie("token").value;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor (จัดการ error)
  // axiosInstance.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if (error.response?.status === 401) {
  //       // Redirect to login or refresh token
  //       navigateTo("/login");
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return {
    async get<T = any>(url: string, config?: AxiosRequestConfig) {
      return await axiosInstance.get<T>(url, config);
    },
    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
      return await axiosInstance.post<T>(url, data, config);
    },
    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
      return await axiosInstance.put<T>(url, data, config);
    },
    async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
      return await axiosInstance.patch<T>(url, data, config);
    },
    async delete<T = any>(url: string, config?: AxiosRequestConfig) {
      return await axiosInstance.delete<T>(url, config);
    },
    instance: axiosInstance, // ถ้าต้องการใช้ instance โดยตรง
  };
};
