<template>
    <UiDev>
        <!-- Form Header -->
        <div class="flex flex-row justify-between items-center mb-5">
            <h2 class="text-2xl font-bold">{{ $t('form') + ' ' + $t('role') }}</h2>
            <Button label="back" variant="text" @click="navigateTo('/role')"
                class="text-gray-600 hover:text-gray-800" />
        </div>

        <!-- Form -->
        <Form :resolver="resolver" :initialValues="formState" @submit="" class="flex flex-col gap-2">
            <!-- Code Field -->
            <div class="flex flex-row justify-between gap-3">
                <FormField v-slot="$field" name="code" class="flex flex-col gap-1 flex-1">
                    <FloatLabel variant="on">
                        <InputText v-bind="$field" v-model="formState.code"
                            class="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary transition" />
                        <label>{{ $t("code") }}</label>
                    </FloatLabel>
                    <Message v-if="$field.invalid" severity="error" size="small" class="mt-1">
                        {{ $t($field.error.message) }}
                    </Message>
                </FormField>

                <!-- Select/Deselect All Button -->

                <Button size="small" icon="pi pi-check-square"
                    :label="allSelected ? `ยกเลิกทั้งหมด (${formState.permissions.length}/${totalPermissions})` : `เลือกทั้งหมด (${formState.permissions.length}/${totalPermissions})`"
                    @click="toggleAll" />

            </div>


            <!-- Grouped Permissions -->
            <div v-for="group in groupedPermissions" :key="group.group" class=" rounded p-2 ">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="font-semibold text-lg"><i class="pi pi-play-circle mr-2"></i> {{ group.group }}</h3>
                    <Button size="small" variant="outlined" icon="pi pi-check-square"
                        :label="isGroupSelected(group) ? `ยกเลิกทั้งหมด (${group.permissions.filter(p => formState.permissions.includes(p.id)).length}/${group.permissions.length})` : `เลือกทั้งหมด (${group.permissions.filter(p => formState.permissions.includes(p.id)).length}/${group.permissions.length})`"
                        @click="toggleGroup(group)" />
                </div>
                <SelectButton v-model="formState.permissions" :options="group.permissions" optionLabel="label"
                    optionValue="id" multiple class="flex flex-wrap gap-2" />
            </div>

            <!-- Form Actions -->
            <div class="flex justify-end gap-5 sticky bottom-5 p-2 rounded bg-surface-0 dark:bg-surface-900">
                <Button label="Cancel" variant="text" @click="navigateTo('/role')"
                    class="text-gray-600 hover:text-gray-800" />
                <Button type="submit" label="Submit" />
            </div>
        </Form>
    </UiDev>
</template>

<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod'
import type { CreateRoleDto } from '~/modules/role/schemas/role.dto'
import { CreateRoleSchema } from '~/modules/role/schemas/role.schema'
import { usePermissions } from '~/modules/permission/composables/usePermission'
import { reactive, computed, onMounted } from 'vue'

const { fetchAll, permissionList } = usePermissions()

const formState = reactive<CreateRoleDto>({
    code: '',
    permissions: []
})

const resolver = zodResolver(CreateRoleSchema)

// จัดกลุ่ม permission ตาม prefix
const groupedPermissions = computed(() => {
    const groups: Record<string, any[]> = {}
    permissionList.value.data.forEach((p) => {
        const prefix = p.code?.split('-')[0] || 'Unknown'
        if (!groups[prefix]) groups[prefix] = []
        groups[prefix].push({
            ...p,
            label: p.code?.split('-')[1]
        })
    })
    return Object.entries(groups).map(([group, permissions]) => ({
        group: group.charAt(0).toUpperCase() + group.slice(1),
        permissions
    }))
})

// ฟังก์ชันเลือก/ยกเลิกทั้งหมดในกลุ่ม
function toggleGroup(group: { permissions: { id: number }[] }) {
    const ids = group.permissions.map((p) => p.id)
    const allSelected = ids.every((id) => formState.permissions.includes(id))

    formState.permissions = allSelected
        ? formState.permissions.filter(id => !ids.includes(id))
        : Array.from(new Set([...formState.permissions, ...ids]))
}

// ตรวจสอบสถานะ group
function isGroupSelected(group: { permissions: { id: number }[] }) {
    return group.permissions.every(p => formState.permissions.includes(p.id))
}

// เลือก/ยกเลิกทั้งหมดฟอร์ม
const totalPermissions = computed(() => permissionList.value.data.length)
const allSelected = computed(() => totalPermissions.value === formState.permissions.length)

function toggleAll() {
    formState.permissions = allSelected.value
        ? []
        : permissionList.value.data.map(p => p.id)
}

onMounted(async () => {
    await fetchAll()
    console.log(permissionList.value)
})
</script>

<style scoped>
/* สีและ transition custom */
.bg-primary {
    background-color: #4f46e5;
}

.bg-primary-dark {
    background-color: #4338ca;
}

.text-primary {
    color: #4f46e5;
}

.text-primary-dark {
    color: #4338ca;
}
</style>
