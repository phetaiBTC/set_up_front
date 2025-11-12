// plugins/axios.ts
import axios, { type AxiosInstance } from "axios";
import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase || "http://localhost:4000";

  // สร้าง instance ของ axios
  const api: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true, // ต้องมีถ้าใช้ cookie
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor: เพิ่ม token จาก cookie (SSR + client)
  api.interceptors.request.use((request) => {
    const cookieToken = useCookie("token")?.value;
    if (cookieToken) {
      request.headers["Authorization"] = `Bearer ${cookieToken}`;
    }
    return request;
  });

  // Response interceptor (optional)
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 && process.client)
        navigateTo("/login");
      return Promise.reject(error);
    }
  );

  // Provide ให้ Nuxt app
  nuxtApp.provide("api", api);
  nuxtApp.provide("axios", api); // alias
});
