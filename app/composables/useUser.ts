import { useUserStore } from "~/stores/user.store";
import { useToast } from "primevue/usetoast";

export const useUser = () => {
  const store = useUserStore();
  const toast = useToast();

  const findAll = async () => {
    try {
      store.setLoading(true);
      const response = await useApi().get("/user");
      if (!response.data) return;
      store.setUserList(response.data);
      return response.data;
    } catch (err: any) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: err.response?.data?.message || err.message,
        life: 3000,
      });
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  return { findAll };
};
