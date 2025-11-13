<template>
  <DataTable
    ref="dt"
    v-model:selection="selection"
    :value="props.data.data"
    dataKey="id"
    :paginator="false"
    scrollable
    scrollHeight="400px"
    :loading="loading"
    :rows="10"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[5, 10, 25]"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
  >
    <template #header>
      <div class="flex flex-wrap gap-2 items-center justify-between">
        <h4 class="m-0">{{ $t("manage") + " " + $t(title) }}</h4>
        <div class="flex gap-2">
          <ToggleButton
            :value="sort"
            @update:value="emit('update:sort', $event)"
            onIcon="pi pi-sort-alpha-down"
            off-label="z-a"
            on-label="a-z"
            offIcon="pi pi-sort-alpha-down-alt"
            aria-label="Toggle Status"
            @change="
              emit('onChangeSort', {
                sort: sort ? sortType.ASC : sortType.DESC,
              })
            "
          />
          <ToggleButton
            :value="checked"
            @update:value="emit('update:checked', $event)"
            onIcon="pi pi-check"
            :off-label="$t('inactive')"
            :on-label="$t('active')"
            offIcon="pi pi-trash"
            aria-label="Toggle Status"
            @change="
              emit('onChangeChecked', {
                is_active: checked ? Status.ACTIVE : Status.INACTIVE,
              })
            "
          />
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>

            <InputText :placeholder="$t('search') + '...'" />
          </IconField>
        </div>
      </div>
    </template>

    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
    <Column header="#" headerStyle="width:3rem">
      <template #body="slotProps">
        {{ slotProps.index + 1 }}
      </template>
    </Column>
    <Column
      style="min-width: 150px"
      field="username"
      frozen
      :header="$t('username')"
      :sortable="true"
    ></Column>
    <Column
      style="min-width: 150px"
      field="email"
      :header="$t('email')"
      :sortable="true"
    >
    </Column>
    <Column
      style="min-width: 150px"
      field="is_verified"
      :header="$t('is_verified')"
      :sortable="true"
    >
      <template #body="{ data }">
        <Tag
          icon="pi pi-check"
          :severity="data.is_verified ? 'success' : 'danger'"
          :value="data.is_verified ? $t('verified') : $t('unverified')"
        ></Tag>
      </template>
    </Column>
    <Column
      style="min-width: 150px"
      field="createdAt"
      :header="$t('createdAt')"
      :sortable="true"
    ></Column>
    <Column
      style="min-width: 150px"
      field="updatedAt"
      :header="$t('updatedAt')"
      :sortable="true"
    ></Column>
    <Column
      field="deletedAt"
      style="min-width: 150px"
      :header="$t('deletedAt')"
      :sortable="true"
    >
      <template #body="{ data }">{{
        data.deletedAt ? data.deletedAt : "-"
      }}</template>
    </Column>
    <Column :exportable="false" frozen alignFrozen="right">
      <template #body="slotProps">
        <div class="flex flex-row gap-2">
          <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="" />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click=""
          />
        </div>
      </template>
    </Column>
  </DataTable>

  <Paginator
    :first="(query.page! - 1) * query.limit!"
    :rows="query.limit"
    :totalRecords="data.pagination.total"
    :rowsPerPageOptions="[5, 10, 20, 30]"
    @page="emit('onChangePage', { page: $event.page + 1, limit: $event.rows })"
  />
</template>

<script setup lang="ts">
import type { IUserEntity } from "~/types/entities/user.entity";
import { type PaginatedResponse } from "../../shared/entities/paginate.entity";
import { sortType, Status } from "~/types/enum/paginate.enum";
import type { IPaginateDto } from "~/types/dto/paginate.dto";

const props = defineProps<{
  data: PaginatedResponse<IUserEntity>;
  value: IUserEntity[];
  title: string;
  loading: boolean;
  sort: sortType;
  checked: Status;
  query: IPaginateDto;
}>();

const emit = defineEmits([
  "update:value",
  "update:sort",
  "update:checked",
  "onChangeSort",
  "onChangeChecked",
  "onChangePage",
]);
const selection = ref<IUserEntity[]>(props.value);

watch(selection, (val) => {
  emit("update:value", val);
});
</script>

<style scoped></style>
