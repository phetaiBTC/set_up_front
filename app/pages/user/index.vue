<template>
  <div class="grid grid-cols-12 gap-8">
    <UiStats title="users" :count="24" type="people">
      <div
        class="flex items-center justify-center rounded-border bg-blue-100 dark:bg-blue-400/10 text-blue-500"
        style="width: 2.5rem; height: 2.5rem"
      >
        <i class="pi pi-users text-xl"></i>
      </div>
    </UiStats>

    <div class="col-span-12">
      <div class="card">
        <Toolbar class="mb-6">
          <template #start>
            <Button
              label="New"
              icon="pi pi-plus"
              severity="secondary"
              class="mr-2"
              @click=""
            />
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="secondary"
              @click=""
            />
          </template>

          <template #end>
            <Button
              label="Export"
              icon="pi pi-upload"
              severity="secondary"
              @click=""
            />
          </template>
        </Toolbar>

        <DataTable
          ref="dt"
          v-model:selection="selectedProducts"
          :value="products"
          dataKey="id"
          :paginator="true"
          :rows="10"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        >
          <template #header>
            <div class="flex flex-wrap gap-2 items-center justify-between">
              <h4 class="m-0">Manage Products</h4>
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText placeholder="Search..." />
              </IconField>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column field="name" header="Name" :sortable="true"></Column>
          <Column field="price" header="Price" :sortable="true">
            <template #body="{ data }">
              {{ formatCurrency(data.price) }}
            </template>
          </Column>
          <Column field="category" header="Category" :sortable="true"></Column>
        </DataTable>
      </div>
    </div>
    <div class="col-span-12 xl:col-span-6"></div>
  </div>
</template>

<script setup lang="ts">
const selectedProducts = ref<[]>([]);
const products = ref([
  {
    id: 1,
    name: "Bamboo Watch",
    price: 65000,
    category: "Accessories",
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: 2,
    name: "Bamboo Watch",
    price: 65000,
    category: "Accessories",
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
]);
</script>

<style scoped></style>
