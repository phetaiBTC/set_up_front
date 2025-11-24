<template>
  <div>
    <div class="grid grid-cols-12 gap-8">
      <!-- UiStats -->
      <UiStats
        title="users"
        :count="store.userList.pagination.count"
        :type="$t('people')"
        icon="pi pi-users text-xl"
      />

      <!-- User Table -->
      <div class="col-span-12">
        <div class="card">
          <Tabs value="table">
            <TabList>
              <Tab value="table">{{ $t("table") }}</Tab>
              <Tab value="card">{{ $t("card") }}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="table">
                <Toolbar class="mb-6">
                  <template #start>
                    <Button
                      label="New"
                      icon="pi pi-plus"
                      severity="secondary"
                      class="mr-2"
                    />
                    <Button
                      label="Delete"
                      icon="pi pi-trash"
                      severity="secondary"
                    />
                  </template>
                  <template #end>
                    <Button
                      label="Export"
                      icon="pi pi-upload"
                      severity="secondary"
                    />
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
                  @on-search="onQuery.search($event)"
                  @on-change-sort="onQuery.sort($event.sort)"
                  @on-change-active="onQuery.checked($event.is_active)"
                  @on-change-page="onQuery.page($event.page, $event.limit)"
                />
              </TabPanel>
              <TabPanel value="card">
                <p class="m-0">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Consectetur, adipisci velit, sed quia non numquam
                  eius modi.
                </p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { useUserStore } from "~/stores/user.store";
import type { IPaginateDto } from "~/types/dto/paginate.dto";
import { sortType, Status } from "~/types/enum/paginate.enum";

const route = useRoute();
const router = useRouter();
const store = useUserStore();
const { findAll } = useUser();

/* -----------------------------------
   INITIAL QUERY (from URL)
----------------------------------- */
const query = reactive<IPaginateDto>({
  page: Number(route.query.page ?? 1),
  limit: Number(route.query.limit ?? 10),
  search: String(route.query.search ?? ""),
  sort: (route.query.sort as sortType) ?? sortType.ASC,
  is_active: (route.query.is_active as Status) ?? Status.ACTIVE,
});

if (!route.query.page) {
  router.replace({ query: { ...query } });
}

/* -----------------------------------
   HELPERS
----------------------------------- */
const updateUrl = () => {
  router.replace({ query: { ...query } });
};

const load = async () => {
  await findAll({ ...query });
};

/* -----------------------------------
   QUERY UPDATER
----------------------------------- */
const onQuery = {
  search: async (value: string) => {
    query.search = value;
    query.page = 1;
    updateUrl();
    await load();
  },

  sort: async (value: sortType) => {
    query.sort = value;
    query.page = 1;
    updateUrl();
    await load();
  },

  checked: async (value: Status) => {
    query.is_active = value;
    query.page = 1;
    updateUrl();
    await load();
  },

  page: async (page: number, limit: number) => {
    query.page = page;
    query.limit = limit;
    updateUrl();
    await load();
  },
};

/* -----------------------------------
   SYNC URL WHEN QUERY CHANGES
----------------------------------- */
watch(
  () => ({ ...query }),
  () => updateUrl()
);

/* -----------------------------------
   FIRST LOAD
----------------------------------- */
await load();

/* -----------------------------------
   TABLE SELECTION
----------------------------------- */
const selectedUsers = ref([]);
</script>
