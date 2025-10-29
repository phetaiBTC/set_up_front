import { GetType } from "~/shared/dto/pagination.dto";
import { permissionService } from "../services/permission.service";
import { usePermissionStore } from "../stores/usePermissionStore";
export const usePermissions = () => {
  const store = usePermissionStore();

  // Fetch all items
  const fetchAll = async () => {
    try {
      store.setLoading(true);
      store.setError(null);
      const items = await permissionService.getAll();
      store.setItems(items);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch permission";
      store.setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  return {
    // State
    permissionList: computed(() => store.permissionList),
    permission: computed(() => store.permission),
    loading: computed(() => store.loading),
    error: computed(() => store.error),
    // Getters
    getById: store.getById,
    // Actions
    fetchAll,
  };
};
