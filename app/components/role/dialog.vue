<template>
    <div class="card flex justify-center">
        <Dialog v-model:visible="localVisible" modal :header="$t('add') + ' ' + $t('role')" :style="{ width: '25rem' }">
            <form @submit.prevent="handleSubmit">
                <FloatLabel variant="on">
                    <InputText id="on_label" v-model="formData.code" />
                    <label for="on_label">{{ $t('code') }}</label>
                </FloatLabel>

                <div class="flex gap-2">
                    <div class="flex justify-end gap-2">
                        <Button type="button" :label="$t('cancel')" severity="secondary"
                            @click="localVisible = false" />
                        <Button type="button" :label="$t('save')" @click="localVisible = false" />
                    </div>
                </div>
            </form>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import type { CreateRoleDto, Role } from '~/modules/role/schemas/role.dto';
const props = defineProps<{ visible: boolean, initialData?: Role, loading?: boolean }>()
const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
}>()
const localVisible = ref(props.visible)
watch(localVisible, (val) => emit('update:visible', val))
watch(() => props.visible, (val) => (localVisible.value = val))
const formData = reactive<CreateRoleDto>({
    code: props.initialData?.code || '',
    permission: props.initialData?.permissions.map((p) => p.id) || [],
})
const handleSubmit = () => {
}
</script>
