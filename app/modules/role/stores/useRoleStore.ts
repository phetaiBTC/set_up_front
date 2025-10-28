import { defineStore } from "pinia";
import type { Role } from "../schemas/role.dto";
import type { PaginatedResponse } from "~/shared/interface/pagination.interface";
import { defaultDataPagination } from "~/shared/BaseModule/stores/useBaseStore";
import {
  GetType,
  sortType,
  Status,
  type PaginationDto,
} from "~/shared/dto/pagination.dto";

export const useRoleStore = defineStore("role", () => {
  // State
  const roleList = ref<PaginatedResponse<Role>>({
    data: [],
    pagination: {
      total: 0,
      count: 0,
      limit: 0,
      totalPages: 0,
      currentPage: 1,
    },
  });
  const role = ref<Role | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const setItems = (items: PaginatedResponse<Role>) => {
    roleList.value = items;
  };
  // Getters
  const getById = computed(() => {
    return (id: number) => roleList.value.data.find((item) => item.id === id);
  });

  function addItem(item: Role) {
    roleList.value.data.push(item);
  }

  function updateItem(id: number, data: Partial<Role>) {
    const index = roleList.value.data.findIndex((item) => item.id === id);
    if (index !== -1 && roleList.value.data[index]) {
      roleList.value.data[index] = {
        ...roleList.value.data[index],
        ...data,
      };
    }
  }

  function removeItem(id: number) {
    roleList.value.data = roleList.value.data.filter((item) => item.id !== id);
  }

  function setCurrentItem(item: Role | null) {
    role.value = item;
  }

  function setLoading(value: boolean) {
    loading.value = value;
  }

  function setError(message: string | null) {
    error.value = message;
  }

  function reset() {
    roleList.value = defaultDataPagination;
    role.value = null;
    loading.value = false;
    error.value = null;
  }

  return {
    // State
    roleList,
    role,
    loading,
    error,
    // Getters
    getById,
    setItems,
    // Actions
    addItem,
    updateItem,
    removeItem,
    setCurrentItem,
    setLoading,
    setError,
    reset,
  };
});
