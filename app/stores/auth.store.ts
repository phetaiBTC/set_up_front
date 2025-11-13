import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const loading = ref(false);
  const setLoading = (value: boolean) => {
    loading.value = value;
  };
  return { loading, setLoading };
});
