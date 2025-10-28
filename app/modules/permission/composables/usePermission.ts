import { permissionService } from "../services/permission.service";
import { usePermissionStore } from "../stores/usePermissionStore";
import type {
  CreatePermissionDto,
  UpdatePermissionDto,
} from "../schemas/permission.dto";

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

  // Fetch by ID
  const fetchById = async (id: number) => {
    try {
      store.setLoading(true);
      store.setError(null);
      const item = await permissionService.getById(id);
      store.setCurrentItem(item);
      return item;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch permission";
      store.setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  // Create new item
  const create = async (data: CreatePermissionDto) => {
    try {
      store.setLoading(true);
      const newItem = await permissionService.create(data);
      store.addItem(newItem);
      return newItem;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create permission";
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  // Update item
  const update = async (id: number, data: UpdatePermissionDto) => {
    try {
      store.setLoading(true);
      const updated = await permissionService.update(id, data);
      store.updateItem(id, updated);
      return updated;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update permission";
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  // Delete item
  const remove = async (id: number) => {
    try {
      store.setLoading(true);
      await permissionService.delete(id);
      store.removeItem(id);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete permission";
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
    fetchById,
    create,
    update,
    remove,
  };
};
