import { userService } from "../services/user.service";
import { useUserStore } from "../stores/useUserStore";
import type { CreateUserDto, UpdateUserDto } from "../schemas/user.dto";
import { computed } from "vue";
export const useUsers = () => {
  const store = useUserStore();

  // Fetch all items
  const fetchAll = async () => {
    try {
      store.setLoading(true);
      store.setError(null);
      const items = await userService.getAll();
      store.setItems(items);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch user";
      store.setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  // Fetch by ID
  const fetchById = async (id: string) => {
    try {
      store.setLoading(true);
      store.setError(null);
      const item = await userService.getById(id);
      store.setCurrentItem(item);
      return item;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch user";
      store.setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  // Create new item
  const create = async (data: CreateUserDto) => {
    try {
      store.setLoading(true);
      const newItem = await userService.create(data);
      store.addItem(newItem);
      return newItem;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create user";
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  // Update item
  const update = async (id: string, data: UpdateUserDto) => {
    try {
      store.setLoading(true);
      const updated = await userService.update(id, data);
      store.updateItem(id, updated);
      return updated;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update user";
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  // Delete item
  const remove = async (id: string) => {
    try {
      store.setLoading(true);
      await userService.delete(id);
      store.removeItem(id);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete user";
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  return {
    // State
    items: computed(() => store.items),
    currentItem: computed(() => store.currentItem),
    loading: computed(() => store.loading),
    error: computed(() => store.error),
    // Getters
    getById: store.getById,
    total: computed(() => store.total),
    // Actions
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  };
};
