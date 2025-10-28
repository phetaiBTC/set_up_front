<template>
    <!-- <div class="card flex justify-center"> -->
    <Dialog v-model:visible="localVisible" modal :header="$t('add') + ' ' + $t('role')" :style="{ width: '25rem' }">
        <Form :resolver="resolver" :initialValues="formState" @submit="onFormSubmit()" class="flex flex-col gap-4 py-2">
            <FormField v-slot="$field" name="code" class="flex flex-col gap-1" variant="on">
                <FloatLabel variant="on">
                    <InputText v-bind="$field" class="w-full" v-model="formState.code" />
                    <label>{{ $t("code") }}</label>
                </FloatLabel>
                <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
                    {{ $t($field.error.message) }}
                </Message>
            </FormField>
            <!-- {{ formState }} -->
            <div class="flex justify-end gap-2">
                <Button label="Cancel" variant="text" @click="localVisible = false" />
                <Button type="submit" label="Submit" />
            </div>
        </Form>
    </Dialog>
    <!-- </div> -->
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { CreateRoleSchema } from "~/modules/role/schemas/role.schema";
import type { CreateRoleDto, Role } from "~/modules/role/schemas/role.dto";

const props = defineProps<{
    visible: boolean;
    initialData?: Role;
    loading?: boolean;
}>();

const emit = defineEmits<{
    (e: "update:visible", value: boolean): void;
}>();

const localVisible = ref(props.visible);

watch(localVisible, (val) => emit("update:visible", val));
watch(
    () => props.visible,
    (val) => (localVisible.value = val)
);
watch(
    () => props.initialData,
    (val) => {
        if (val) {
            formState.code = val.code;
            formState.permissions = val.permissions.map((p) => p.id);
        }
    }
)

const formState = reactive<CreateRoleDto>({
    code: "",
    permissions: [],
});

const resolver = zodResolver(CreateRoleSchema);

const onFormSubmit = () => {
    console.log("✅ Form submitted:");
};
</script>
