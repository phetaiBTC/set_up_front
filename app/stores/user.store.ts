import { defineStore } from "pinia";
import type { IOptionEntity } from "~/shared/entities/option.entity";
import type { PaginatedResponse } from "~/shared/entities/paginate.entity";
import { type IUserEntity } from "~/types/entities/user.entity";

export const useUserStore = defineStore("user", () => {
  const loading = ref(false);
  const userList = ref<PaginatedResponse<IUserEntity>>({
    data: [],
    pagination: {
      total: 0,
      count: 0,
      limit: 0,
      totalPages: 0,
      currentPage: 0,
    },
  });
  const userOptions = ref<IOptionEntity[]>([]);
  const user = ref<IUserEntity>({
    id: 0,
    username: "",
    email: "",
    roles: [],
    permissions: [],
    is_verified: false,
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  });

  const setUserOptions = (value: IOptionEntity[]) => {
    userOptions.value = value;
  };
  const setUserList = (value: PaginatedResponse<IUserEntity>) => {
    userList.value = value;
  };
  const setLoading = (value: boolean) => {
    loading.value = value;
  };
  const setUser = (value: IUserEntity) => {
    user.value = value;
  };
  return {
    loading,
    userList,
    user,
    userOptions,
    setLoading,
    setUserList,
    setUser,
    setUserOptions,
  };
});
