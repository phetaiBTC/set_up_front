import { roleService } from "../services/role.service";
import { useRoleStore } from "../stores/useRoleStore";
import type { CreateRoleDto, UpdateRoleDto } from "../schemas/role.dto";
import type { PaginationDto } from "~/shared/dto/pagination.dto";

export const useRole = () => {
  const store = useRoleStore();

  // Fetch all items
  const fetchAll = async (query: PaginationDto) => {
    try {
      store.setLoading(true);
      store.setError(null);
      const items = await roleService.getAll(query);
      store.setItems(items);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch role";
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
      const item = await roleService.getById(id);
      store.setCurrentItem(item);
      return item;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch role";
      store.setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  // Create new item
  const create = async (data: CreateRoleDto) => {
    try {
      store.setLoading(true);
      const newItem = await roleService.create(data);
      store.addItem(newItem);
      return newItem;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create role";
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  // Update item
  const update = async (id: number, data: UpdateRoleDto) => {
    try {
      store.setLoading(true);
      const updated = await roleService.update(id, data);
      store.updateItem(id, updated);
      return updated;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update role";
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  // Delete item
  const remove = async (id: number) => {
    try {
      store.setLoading(true);
      await roleService.delete(id);
      store.removeItem(id);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete role";
      throw err;
    } finally {
      store.setLoading(false);
    }
  };
  return {
    // State
    roleList: computed(() => store.roleList),
    role: computed(() => store.role),
    loading: computed(() => store.loading),
    error: computed(() => store.error),
    // Getters
    getById: store.getById,
    // Actions
    fetchAll,
    fetchById,
    create,
    update,
    remove
  };
};
