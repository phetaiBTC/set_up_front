<template>

    <DataTable :value="data.data" :pt="{
        header: { class: 'bg-pink-600 text-white font-semibold' }
    }" :loading="loading" scrollable scrollHeight="400px" class="mt-6">

        <Column header="#" headerStyle="width:3rem">
            <template #body="slotProps">
                {{ slotProps.index + 1 }}
            </template>
        </Column>
        <!-- <Column field="id" sortable header="Id" style="min-width: 100px"></Column> -->
        <Column field="code" sortable header="Code" style="min-width: 200px" frozen class="font-bold"></Column>
        <Column field="createdAt" sortable header="Created At" style="min-width: 200px">
            <!-- <template #body="slotProps">
                <Skeleton v-if="loading"></Skeleton>
                <span>
                    {{ slotProps.data.createdAt ? slotProps.data.createdAt : "..." }}
                </span>
            </template> -->
        </Column>
        <Column field="updatedAt" sortable header="Updated At" style="min-width: 200px"></Column>
        <Column field="deletedAt" sortable header="Deleted At" style="min-width: 200px">
            <template #body="slotProps">
                {{ slotProps.data.deletedAt ? slotProps.data.deletedAt : "..." }}
            </template>
        </Column>
    </DataTable>


</template>

<script setup lang="ts">
import type { Permission } from '~/modules/permission/schemas/permission.dto';
import type { PaginatedResponse } from '~/shared/interface/pagination.interface';

defineProps<{
    data: PaginatedResponse<Permission>,
    loading: boolean
}>()

</script>

<style scoped></style>