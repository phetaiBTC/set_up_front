import { defineStore } from "pinia";
import type { Permission } from "../schemas/permission.dto";
import type { PaginatedResponse } from "~/shared/interface/pagination.interface";

export const usePermissionStore = defineStore("permission", () => {
  // State
  const permissionList = ref<PaginatedResponse<Permission>>({
    data: [],
    pagination: {
      total: 0,
      count: 0,
      limit: 0,
      totalPages: 0,
      currentPage: 1,
    },
  });
  const permission = ref<Permission | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const setItems = (items: PaginatedResponse<Permission>) => {
    permissionList.value = items;
  };
  // Getters
  const getById = computed(() => {
    return (id: number) =>
      permissionList.value.data.find((item) => item.id === id);
  });
  function setCurrentItem(item: Permission | null) {
    permission.value = item;
  }

  function setLoading(value: boolean) {
    loading.value = value;
  }

  function setError(message: string | null) {
    error.value = message;
  }

  return {
    // State
    permissionList,
    permission,
    loading,
    error,
    // Getters
    getById,
    setItems,
    // Actions
    setCurrentItem,
    setLoading,
    setError,
  };
});
