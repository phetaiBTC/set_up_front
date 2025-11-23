import { useUserStore } from "~/stores/user.store";
import { useToast } from "primevue/usetoast";
import type { PaginatedResponse } from "~/shared/entities/paginate.entity";
import type { IUserEntity } from "~/types/entities/user.entity";
import type { IPaginateDto } from "~/types/dto/paginate.dto";

export const useUser = () => {
  const store = useUserStore();
  const toast = useToast();

  const findAll = async (query: IPaginateDto) => {
    try {
      store.setLoading(true);
      const res = await useApi().get<PaginatedResponse<IUserEntity>>("/user", {
        query,
      });
      store.setUserList(res);
      return res;
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
