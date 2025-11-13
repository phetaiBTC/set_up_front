<template>
  <div>
    <div v-if="pending || store.loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else class="grid grid-cols-12 gap-8">
      <!-- UiStats -->
      <UiStats
        title="users"
        :count="store.userList.pagination.count"
        :type="$t('people')"
      >
        <div
          class="flex items-center justify-center rounded-border bg-blue-100 dark:bg-blue-400/10 text-blue-500"
          style="width: 2.5rem; height: 2.5rem"
        >
          <i class="pi pi-users text-xl"></i>
        </div>
      </UiStats>

      <!-- User Table -->
      <div class="col-span-12">
        <div class="card">
          <Toolbar class="mb-6">
            <template #start>
              <Button
                label="New"
                icon="pi pi-plus"
                severity="secondary"
                class="mr-2"
              />
              <Button label="Delete" icon="pi pi-trash" severity="secondary" />
            </template>
            <template #end>
              <Button label="Export" icon="pi pi-upload" severity="secondary" />
            </template>
          </Toolbar>

          <UserTable
            title="user"
            :loading="store.loading"
            :data="store.userList"
            :sort="query.sort"
            :checked="query.is_active"
            v-model:value="selectedUsers"
            :query="query"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "~/stores/user.store";
import { sortType, Status } from "~/types/enum/paginate.enum";

const route = useRoute();
const router = useRouter();
const query = reactive({
  page: route.query.page ? Number(route.query.page) : 1,
  limit: route.query.limit ? Number(route.query.limit) : 10,
  search: route.query.search ? String(route.query.search) : "",
  sort: route.query.sort
    ? (String(route.query.sort) as sortType)
    : sortType.ASC,
  is_active: route.query.is_active
    ? (String(route.query.is_active) as Status)
    : Status.ACTIVE,
});
if (!route.query.page) {
  router.replace({
    query: {
      page: query.page.toString(),
      limit: query.limit.toString(),
      search: query.search,
      sort: query.sort,
      is_active: query.is_active,
    },
  });
}
const store = useUserStore();
const { findAll } = useUser();
const selectedUsers = ref([]);
const { pending, error } = await useAsyncData("users", () => findAll());
</script>
