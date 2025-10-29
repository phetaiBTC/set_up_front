<template>

    <DataTable :value="data.data" :loading="loading" scrollable scrollHeight="400px"
        class="mt-6 rounded overflow-hidden">
        <Column header="#" headerStyle="width:3rem">
            <template #body="slotProps">
                {{ slotProps.index + 1 }}
            </template>
        </Column>
        <Column field="code" sortable header="Code" frozen class="font-bold"></Column>
        <Column field="createdAt" sortable header="Created At" style="min-width: 200px">
        </Column>
        <Column field="updatedAt" sortable header="Updated At" style="min-width: 200px"></Column>
        <Column field="deletedAt" sortable header="Deleted At" style="min-width: 200px">
            <template #body="slotProps">
                {{ slotProps.data.deletedAt ? slotProps.data.deletedAt : "..." }}
            </template>
        </Column>
        <Column :header="$t('actions')" frozen alignFrozen="right">
            <template #body="slotProps">
                <div class="flex flex-row gap-2">
                    <Button icon="pi pi-pencil" class="p-button-rounded mr-2"
                        @click="navigateTo(`/role/${slotProps.data.id}`)"></Button>
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" variant="outlined"
                        @click="$emit('delete', slotProps.data.id)"></Button>
                </div>
            </template>
        </Column>

    </DataTable>

</template>

<script setup lang="ts">
import type { Role } from '~/modules/role/schemas/role.dto';
import type { PaginatedResponse } from '~/shared/interface/pagination.interface';

defineProps<{
    data: PaginatedResponse<Role>,
    loading: boolean
}>()

</script>

<style scoped></style>