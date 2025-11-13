import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase || "localhost:4000";
  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  axiosInstance.interceptors.request.use((request) => {
    const token = useCookie("token").value;
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        navigateTo({ name: "Login" });
      }
      return Promise.reject(error);
    }
  );
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
    instance: axiosInstance,
  };
};
