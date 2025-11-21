export const useApi = () => {
  const config = useRuntimeConfig();
  const token = useCookie("access_token");

  const baseURL = config.public.apiBase;

  const request = async <T>(method: string, url: string, options: any = {}) => {
    return await $fetch<T>(url, {
      baseURL,
      method,
      headers: {
        Authorization: token.value ? `Bearer ${token.value}` : "",
        ...options.headers,
      },
      ...options,
    });
  };

  return {
    get: <T>(url: string, options?: any) => request<T>("GET", url, options),
    post: <T>(url: string, body?: any, options?: any) =>
      request<T>("POST", url, { body, ...options }),
    put: <T>(url: string, body?: any, options?: any) =>
      request<T>("PUT", url, { body, ...options }),
    delete: <T>(url: string, options?: any) =>
      request<T>("DELETE", url, options),
  };
};
